const { Student } = require("../models/Student.js");
const { Classes } = require("../models/Classes.js");
const { Attendance } = require("../models/Attendace.js");

module.exports.getReportSummary =
async (req, res) => {
  try {

    const totalStudents =
      await Student.countDocuments();

    const classData =
      await Classes.find({});

    const classesCovered =
      new Set(
        classData.map(
          (cls) => cls.className
        )
      ).size;

    const sectionsCovered =
      classData.length;

    const attendanceRecords =
      await Attendance.find({});

    let presentCount = 0;

    attendanceRecords.forEach(
      (record) => {

        if (
          record.status ===
            "Present" ||
          record.status === "Late"
        ) {
          presentCount++;
        }

      }
    );

    const averageAttendance =
      attendanceRecords.length === 0
        ? 0
        : (
            (presentCount /
              attendanceRecords.length) *
            100
          ).toFixed(2);

    return res.status(200).json({
      success: true,

      data: {
        totalStudents,

        averageAttendance,

        classesCovered,

        sectionsCovered,
      },
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate summary report",
    });

  }
};

module.exports.getAttendanceReport =
async (req, res) => {
  try {

    let {
      fromDate,
      toDate,
      className,
      section,
      sortBy
    } = req.query;

    if (!fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message:
          "fromDate and toDate are required"
      });
    }

    const attendanceRecords =
      await Attendance.find({
        date: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      })
      .populate({
        path: "studentId",
        populate: {
          path: "classId"
        }
      });

    const studentAttendanceMap =
      new Map();

    attendanceRecords.forEach(
      (record) => {

        if (!record.studentId) {
          return;
        }

        const student =
          record.studentId;

        const studentClass =
          student.classId;

        if (
          className &&
          studentClass?.className !==
            className
        ) {
          return;
        }

        if (
          section &&
          studentClass?.section !==
            section
        ) {
          return;
        }

        const studentId =
          student._id.toString();

        if (
          !studentAttendanceMap.has(
            studentId
          )
        ) {
          studentAttendanceMap.set(
            studentId,
            {
              studentId,

              name:
                student.name,

              rollNumber:
                student.rollNumber,

              className:
                studentClass
                  ?.className ||
                "-",

              section:
                studentClass
                  ?.section ||
                "-",

              presentCount: 0,

              totalCount: 0
            }
          );
        }

        const currentStudent =
          studentAttendanceMap.get(
            studentId
          );

        currentStudent.totalCount++;

        if (
          record.status ===
            "Present" ||
          record.status === "Late"
        ) {
          currentStudent.presentCount++;
        }

      }
    );

    let reportData = Array.from(
      studentAttendanceMap.values()
    ).map((student) => ({
      studentId:
        student.studentId,

      name: student.name,

      rollNumber:
        student.rollNumber,

      className:
        student.className,

      section:
        student.section,

      attendancePercentage:
        Number(
          (
            (student.presentCount /
              student.totalCount) *
            100
          ).toFixed(2)
        )
    }));

    // Sorting

    switch (sortBy) {

      case "attendanceAsc":
        reportData.sort(
          (a, b) =>
            a.attendancePercentage -
            b.attendancePercentage
        );
        break;

      case "attendanceDesc":
        reportData.sort(
          (a, b) =>
            b.attendancePercentage -
            a.attendancePercentage
        );
        break;

      case "rollAsc":
        reportData.sort(
          (a, b) =>
            a.rollNumber -
            b.rollNumber
        );
        break;

      case "rollDesc":
        reportData.sort(
          (a, b) =>
            b.rollNumber -
            a.rollNumber
        );
        break;

      default:
        reportData.sort(
          (a, b) =>
            b.attendancePercentage -
            a.attendancePercentage
        );
    }

    return res.status(200).json({
      success: true,
      count: reportData.length,
      data: reportData
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate attendance report"
    });

  }
};

module.exports.getClassSummaryReport =
async (req, res) => {
  try {

    const classSummary =
      await Student.aggregate([

        {
          $lookup: {
            from: "classes",
            localField: "classId",
            foreignField: "_id",
            as: "classData"
          }
        },

        {
          $unwind: "$classData"
        },

        {
          $group: {

            _id:
              "$classData.className",

            totalStudents: {
              $sum: 1
            },

            sections: {
              $addToSet:
                "$classData.section"
            }

          }
        },

        {
          $project: {

            _id: 0,

            className: "$_id",

            totalStudents: 1,

            sections: {
              $size: "$sections"
            }

          }
        }

      ]);

    const classOrder = [
      "LKG",
      "UKG",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII"
    ];

    classSummary.sort(
      (a, b) =>
        classOrder.indexOf(
          a.className
        ) -
        classOrder.indexOf(
          b.className
        )
    );

    return res.status(200).json({
      success: true,
      count:
        classSummary.length,
      data: classSummary
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate class summary report"
    });

  }
};

