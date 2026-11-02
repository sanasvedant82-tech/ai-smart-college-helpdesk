const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const colleges = [
    {
        name: "K. J. Somaiya College of Arts and Commerce",
        location: "Mumbai",
        streams: "Arts, Commerce"
    },
    {
        name: "SIES College of Arts, Science and Commerce",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "Ramnarain Ruia Autonomous College",
        location: "Mumbai",
        streams: "Arts, Science"
    },
    {
        name: "R. A. Podar College of Commerce and Economics",
        location: "Mumbai",
        streams: "Commerce"
    },
    {
        name: "Mithibai College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "Jai Hind College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "K.C. College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "St. Xavier's College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "Wilson College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "Sophia College for Women",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "H.R. College of Commerce and Economics",
        location: "Mumbai",
        streams: "Commerce"
    },
    {
        name: "R.D. National College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "Thakur College of Science and Commerce",
        location: "Mumbai",
        streams: "Science, Commerce"
    },
    {
        name: "Patkar-Varde College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    },
    {
        name: "Nagindas Khandwala College",
        location: "Mumbai",
        streams: "Arts, Science, Commerce"
    }
,
    {"name": "Yashwantrao Chavan College of Arts, Commerce and Science", "location": "Koparkhairane, Navi Mumbai", "streams": "Arts, Science, Commerce, B.Sc CS, B.Sc IT, BMS, BMM, B.Com"},
    {"name": "F.G. Naik College of Arts, Science and Commerce", "location": "Koparkhairane, Navi Mumbai", "streams": "Arts, Science, Commerce"},
    {"name": "D.V.S. College of Commerce", "location": "Koparkhairane, Navi Mumbai", "streams": "Commerce"},
    {"name": "I.C.L.E.S. Motilal Jhunjhunwala College", "location": "Vashi, Navi Mumbai", "streams": "Arts, Science, Commerce"},
    {"name": "S.K. College of Science and Commerce", "location": "Nerul, Navi Mumbai", "streams": "Science, Commerce"},
    {"name": "Sterling College of Arts, Commerce and Science", "location": "Nerul, Navi Mumbai", "streams": "Arts, Science, Commerce"},
    {"name": "New Horizon College of Commerce", "location": "Airoli, Navi Mumbai", "streams": "Commerce"},
    {"name": "Pillai College of Arts, Commerce and Science", "location": "New Panvel", "streams": "Arts, Science, Commerce"},
    {"name": "SIES Graduate School of Technology", "location": "Nerul, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Fr. C. Rodrigues Institute of Technology", "location": "Vashi, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Lokmanya Tilak College of Engineering", "location": "Koparkhairane, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Smt. Indira Gandhi College of Engineering", "location": "Ghansoli, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Bharati Vidyapeeth College of Engineering", "location": "CBD Belapur, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Datta Meghe College of Engineering", "location": "Airoli, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "A. C. Patil College of Engineering", "location": "Kharghar, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Saraswati College of Engineering", "location": "Kharghar, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Terna Engineering College", "location": "Nerul, Navi Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Pillai College of Engineering", "location": "New Panvel", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Gahlot Institute of Pharmacy", "location": "Koparkhairane, Navi Mumbai", "streams": "Pharmacy, B.Pharm"},
    {"name": "Bharati Vidyapeeth College of Pharmacy", "location": "CBD Belapur, Navi Mumbai", "streams": "Pharmacy, B.Pharm"},
    {"name": "Oriental College of Pharmacy", "location": "Sanpada, Navi Mumbai", "streams": "Pharmacy, B.Pharm"},

    {"name":"M.L. Dahanukar College of Commerce","location":"Vile Parle, Mumbai","streams":"Commerce, B.Com, BMS"},
    {"name":"Sathaye College","location":"Vile Parle, Mumbai","streams":"Arts, Science, Commerce, B.Com, BMS"},
    {"name":"Maharshi Dayanand College of Arts, Science and Commerce","location":"Parel, Mumbai","streams":"Arts, Science, Commerce, B.Sc CS, B.Com, BMS, BMM"},
    {"name":"Akbar Peerbhoy College of Commerce and Economics","location":"Mumbai","streams":"Commerce, B.Com, BMS, B.Sc CS, B.Sc IT, BMM"},
    {"name":"Ramrao Adik Institute of Technology","location":"Nerul, Navi Mumbai","streams":"Engineering, B.E., B.Tech"},
    {"name":"Rajiv Gandhi College of Arts, Commerce and Science","location":"Navi Mumbai","streams":"Arts, Science, Commerce, B.Com, BMS"},
    {"name":"Sanpada College of Commerce and Technology","location":"Sanpada, Navi Mumbai","streams":"Commerce, B.Com, BMS"},
    {"name": "Siddharth College of Commerce and Economics", "location": "Fort, Mumbai", "streams": "Commerce, B.Com, BMS, BMM, B.Sc IT"},
    {"name": "Guru Nanak College of Arts, Science and Commerce", "location": "Sion, Mumbai", "streams": "Arts, Science, Commerce, B.Com, BMS"},
    {"name": "N.G. Acharya and D.K. Marathe College of Arts, Science and Commerce", "location": "Chembur, Mumbai", "streams": "Arts, Science, Commerce, B.Sc CS"},
    {"name": "L. S. Raheja College of Arts and Commerce", "location": "Santacruz, Mumbai", "streams": "Arts, Commerce, B.Com, BMS, BMM"},
    {"name": "Hazarimal Somani College of Arts and Science", "location": "Fort, Mumbai", "streams": "Arts, Science"},
    {"name": "Karmaveer Bhaurao Patil College", "location": "Vashi, Navi Mumbai", "streams": "Arts, Science, Commerce, B.Com, BMS"},
    {"name": "N.R. Bhagat College of Arts, Science and Commerce", "location": "Nerul, Navi Mumbai", "streams": "Arts, Science, Commerce, B.Com"},
    {"name": "Tilak Education Society's S.K. College of Science and Commerce", "location": "Nerul, Navi Mumbai", "streams": "Science, Commerce, B.Com, B.Sc"},
    {"name": "Vishweshwar Education Society Western College of Commerce and Business Management", "location": "Navi Mumbai", "streams": "Commerce, B.Com, B.Com A&F, BMS, B.Sc IT"},
    {"name": "JVM's Mehta Degree College", "location": "Airoli, Navi Mumbai", "streams": "Commerce, Science, Degree Courses"},
    {"name": "Rajmata Jijau Night College of Science", "location": "Navi Mumbai", "streams": "Science, B.Sc IT"},
    {"name": "Smt. Sushiladevi Deshmukh College of Arts, Science and Commerce", "location": "Navi Mumbai", "streams": "Arts, Science, Commerce"},
    {"name": "J.K. College of Science and Commerce", "location": "Ghansoli, Navi Mumbai", "streams": "Science, Commerce"},
    {"name": "Tilak Education Society's College of Arts and Commerce", "location": "Vashi, Navi Mumbai", "streams": "Arts, Commerce, B.Com"},
    {"name": "C. K. Thakur Arts, Commerce and Science College", "location": "New Panvel", "streams": "Arts, Commerce, Science, B.Com, B.Sc"},
    {"name": "Ramsheth Thakur College of Commerce and Science", "location": "Kharghar, Navi Mumbai", "streams": "Commerce, Science, B.Com, B.Sc"},
    {"name": "MGM's College of Computer Science and Information Technology", "location": "Kamothe, Navi Mumbai", "streams": "B.Sc Computer Science, B.Sc Information Technology"},
    {"name": "SES's Shikshan Maharshi Dadasaheb Limaye Arts, Commerce, Science and Computer Science College", "location": "Navi Mumbai", "streams": "Arts, Commerce, Science, Computer Science"},
    {"name": "Dr. Patangrao Kadam Arts and Commerce College", "location": "Navi Mumbai", "streams": "Arts, Commerce, B.Com"},
    {"name": "Rayat Shikshan Sanstha's Mahatma Phule Arts, Science and Commerce College", "location": "Navi Mumbai", "streams": "Arts, Science, Commerce"},
    {"name": "Pen Education Society's Bhausaheb Nene College of Arts, Science and Commerce", "location": "Panvel", "streams": "Arts, Science, Commerce"},
    {"name": "Karnala Sports Academy Barns College of Arts, Science and Commerce", "location": "Panvel", "streams": "Arts, Science, Commerce"},
    {"name": "RSPM's Satyagraha College of Commerce and Management and Science", "location": "Navi Mumbai", "streams": "Commerce, Management, Science"},
    {"name": "Sadguru Vaman Baba Maharaj Commerce and Science College", "location": "Navi Mumbai", "streams": "Commerce, Science"},
    {"name": "Rajiv Gandhi Institute of Technology", "location": "Andheri, Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Rizvi College of Engineering", "location": "Bandra, Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "St. Francis Institute of Technology", "location": "Borivali, Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Atharva College of Engineering", "location": "Malad, Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Vidyalankar Institute of Technology", "location": "Wadala, Mumbai", "streams": "Engineering, B.E., B.Tech"},
    {"name": "Thakur College of Engineering and Technology", "location": "Kandivali, Mumbai", "streams": "Engineering, B.E., B.Tech"},
];

const services = {
    fees: {
        title: "💰 Fees Information",
        answer: "For fee structure, fee payment and payment-related queries, please contact the respective college accounts department."
    },
    exam: {
        title: "📝 Examination Information",
        answer: "Students can check examination forms, exam schedules, hall tickets and examination notices through their college."
    },
    admission: {
        title: "🎓 Admission",
        answer: "For admission process, eligibility and required documents, please contact the respective college admission department."
    },
    library: {
        title: "📖 Library",
        answer: "Library timings, membership, book issue and return information can be obtained from the respective college."
    },
    hostel: {
        title: "🏠 Hostel",
        answer: "Hostel availability and accommodation details depend on the respective college."
    },
    placement: {
        title: "💼 Placement & Career",
        answer: "Students can contact the college placement or career cell for internships, placements and career guidance."
    },
    scholarship: {
        title: "🎁 Scholarship",
        answer: "Students should check their college scholarship section for eligibility, documents and application information."
    },
    sports: {
        title: "🏅 Sports",
        answer: "Students can contact the college sports department for sports activities, teams and events."
    },
    notice: {
        title: "📢 Notices",
        answer: "Important college notices, examination updates, events and announcements can be displayed here."
    }
};

function sendJSON(res, data) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify(data));
}

function getAIAnswer(question) {
    const q = question.toLowerCase();

    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
        return "Hello! 👋 I am your Smart College AI Assistant. How can I help you?";
    }

    if (q.includes("fee") || q.includes("fees") || q.includes("payment")) {
        return services.fees.answer;
    }

    if (q.includes("exam") || q.includes("examination") || q.includes("hall ticket")) {
        return services.exam.answer;
    }

    if (q.includes("admission") || q.includes("eligibility")) {
        return services.admission.answer;
    }

    if (q.includes("library") || q.includes("book")) {
        return services.library.answer;
    }

    if (q.includes("hostel")) {
        return services.hostel.answer;
    }

    if (
        q.includes("placement") ||
        q.includes("career") ||
        q.includes("job") ||
        q.includes("internship")
    ) {
        return services.placement.answer;
    }

    if (q.includes("scholarship")) {
        return services.scholarship.answer;
    }

    if (q.includes("sport") || q.includes("game")) {
        return services.sports.answer;
    }

    if (q.includes("notice") || q.includes("announcement")) {
        return services.notice.answer;
    }

    if (q.includes("timetable") || q.includes("time table")) {
        return "For the latest timetable, please check the respective college department.";
    }

    if (q.includes("result") || q.includes("marks")) {
        return "For result-related information, please check the official university result portal.";
    }

    if (q.includes("course") || q.includes("courses") || q.includes("stream")) {
        return "You can search colleges and streams using the College Search section.";
    }

    return "I can help you with Fees, Exams, Admission, Library, Hostel, Placement, Scholarship, Sports, Notices, Timetable, Results and College Information.";
}

const server = http.createServer((req, res) => {

    // Backend status
    if (req.url === "/api/status") {
        sendJSON(res, {
            success: true,
            message: "Smart College Helpdesk Backend is working!"
        });
        return;
    }

    // College API
    if (req.url === "/api/colleges") {
        sendJSON(res, {
            success: true,
            colleges: colleges
        });
        return;
    }

    // Admission Enquiry API
    if (req.method === "POST" && req.url === "/api/admission-enquiry") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
            if (body.length > 10000) {
                req.destroy();
            }
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);

                if (!data.college || !data.studentName || !data.course) {
                    sendJSON(res, {
                        success: false,
                        message: "Please fill all required fields."
                    });
                    return;
                }

                const file = path.join(__dirname, "admission_enquiries.json");

                fs.readFile(file, "utf8", (err, content) => {
                    let enquiries = [];

                    if (!err) {
                        try {
                            enquiries = JSON.parse(content);
                            if (!Array.isArray(enquiries)) enquiries = [];
                        } catch (e) {
                            sendJSON(res, {success: false, message: "Storage error."});
                            return;
                        }
                    }

                    enquiries.push({
                        college: String(data.college).slice(0, 200),
                        studentName: String(data.studentName).slice(0, 100),
                        course: String(data.course).slice(0, 100),
                        enquiry: String(data.enquiry || "").slice(0, 1000),
                        submittedAt: new Date().toISOString()
                    });

                    fs.writeFile(file, JSON.stringify(enquiries, null, 2), writeErr => {
                        if (writeErr) {
                            sendJSON(res, {success: false, message: "Unable to save enquiry."});
                            return;
                        }

                        sendJSON(res, {success: true, message: "Enquiry saved successfully."});
                    });
                });
            } catch (error) {
                sendJSON(res, {success: false, message: "Invalid enquiry data."});
            }
        });

        return;
    }

    // AI API
    if (req.url.startsWith("/api/ai")) {
        const url = new URL(req.url, "http://localhost:3000");
        const question = url.searchParams.get("question") || "";
        sendJSON(res, {
            success: true,
            answer: getAIAnswer(question)
        });
        return;
    }

    // Services API
    if (req.url === "/api/services") {
        sendJSON(res, {
            success: true,
            services: services
        });
        return;
    }

    // College Details Page
    if (req.url === "/college.html" || req.url.startsWith("/college.html?")) {
        const file = path.join(__dirname, "college.html");

        fs.readFile(file, (err, data) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("College page not found.");
                return;
            }

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        });

        return;
    }

    // Frontend
    if (req.url === "/" || req.url === "/index.html") {
        const file = path.join(__dirname, "index.html");

        fs.readFile(file, (err, data) => {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Frontend file not found.");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        success: false,
        message: "API or page not found"
    }));
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
