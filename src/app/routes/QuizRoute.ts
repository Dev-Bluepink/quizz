import QuizController from "../controller/QuizController";
import { Router } from "express";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - questionText
 *         - options
 *         - correctOption
 *       properties:
 *         questionText:
 *           type: string
 *           description: Nội dung câu hỏi
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: Các lựa chọn cho câu hỏi
 *         correctOption:
 *           type: number
 *           description: Chỉ số của lựa chọn đúng
 *     Quiz:
 *       type: object
 *       required:
 *         - title
 *         - questions
 *       properties:
 *         title:
 *           type: string
 *           description: Tiêu đề của bài kiểm tra
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *           description: Danh sách các câu hỏi
 */

/**
 * @swagger
 * /quiz/select-questions/{id}:
 *   get:
 *     summary: Lấy câu hỏi theo ID bài kiểm tra
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài kiểm tra
 *       - in: query
 *         name: numOfQuestions
 *         schema:
 *           type: integer
 *         required: false
 *         description: Số lượng câu hỏi cần lấy
 *     responses:
 *       200:
 *         description: Danh sách các câu hỏi của bài kiểm tra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 selectedQuestions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *                 selectedQuestionIndexes:
 *                   type: array
 *                   items:
 *                     type: integer
 *       404:
 *         description: Không tìm thấy bài kiểm tra
 */
router.get("/select-questions/:id", QuizController.getQuestionsByQuizId);

/**
 * @swagger
 * /quiz/submit/{id}:
 *   post:
 *     summary: Nộp bài kiểm tra
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài kiểm tra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionIndex:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Danh sách chỉ số câu hỏi
 *               selectedOption:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Danh sách lựa chọn đã chọn
 *     responses:
 *       200:
 *         description: Kết quả của bài kiểm tra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score:
 *                   type: integer
 *                   description: Điểm số đạt được
 *                 maxScore:
 *                   type: integer
 *                   description: Điểm số tối đa
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mô tả lỗi
 *       404:
 *         description: Không tìm thấy bài kiểm tra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mô tả lỗi
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mô tả lỗi
 *                 error:
 *                   type: string
 *                   description: Chi tiết lỗi
 */
router.post("/submit/:id", QuizController.submitQuiz);
/**
 * @swagger
 * /quiz/get-all:
 *   get:
 *     summary: Lấy tất cả các bài kiểm tra
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: Danh sách các bài kiểm tra
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quiz'
 */
router.get("/get-all", QuizController.getAllQuizzes);
/**
 * @swagger
 * /quiz/detail/{id}:
 *   get:
 *     summary: Lấy chi tiết bài kiểm tra
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài kiểm tra
 *     responses:
 *       200:
 *         description: Chi tiết của bài kiểm tra
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: Không tìm thấy bài kiểm tra
 */
router.get("/detail/:id", QuizController.getQuizById);
/**
 * @swagger
 * /quiz/create:
 *   post:
 *     summary: Tạo một bài kiểm tra mới
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       201:
 *         description: Bài kiểm tra đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/create", QuizController.createQuiz);

module.exports = router;
