const express=require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app=express()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:3000",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || (process.env.FRONTEND_URL && origin.startsWith(process.env.FRONTEND_URL))) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}))

/*require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth",authRouter)
app.use("/api/interview", interviewRouter)

module.exports=app