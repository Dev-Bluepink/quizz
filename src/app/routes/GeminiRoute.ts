import { Router } from "express";
import { getGeminiResponse } from "../controller/GeminiController";

const router = Router();
/**
 * @swagger
 * /gemini:
 *   post:
 *     summary: "Nhận phản hồi từ Gemini"
 *     description: "API này gửi một yêu cầu đến Gemini và nhận phản hồi dựa trên nội dung nhập vào."
 *     requestBody:
 *       content:
 *         "application/json":
 *           schema:
 *             type: "object"
 *             properties:
 *               prompt:
 *                 type: "string"
 *                 description: "Nội dung nhập vào để nhận phản hồi từ mô hình Gemini."
 *                 example: "Xin chào, bạn thế nào?"
 *             required:
 *               - "prompt"
 *     responses:
 *       "200":
 *         description: "Phản hồi thành công từ mô hình Gemini"
 *         content:
 *           "text/plain":
 *             schema:
 *               type: "string"
 *               example: "Tôi khỏe, cảm ơn bạn đã hỏi!"
 *       "500":
 *         description: "Lỗi xử lý yêu cầu"
 */
router.post("/", getGeminiResponse);

module.exports = router;
