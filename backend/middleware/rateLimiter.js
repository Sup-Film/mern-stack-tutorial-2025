import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  // Per user rate limiting (สามารถปรับเปลี่ยน key ได้ตามต้องการ)
  try {
    const { success } = await ratelimit.limit(`my-limit-key:${req.ip}`); // ใช้ IP ของผู้ใช้เป็น key

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next(); // ไปยัง middleware ถัดไป
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error); // ส่ง error ไปยัง global error handler
  }
};

export default rateLimiter;
