import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new GoogleGenerativeAI(process.env.API_KEY!);
const model = configuration.getGenerativeModel({ model: "gemini-pro" });
import "express-session";

declare module "express-session" {
  interface SessionData {
    conversationContext: { role: string; parts: Part[] }[];
  }
}

interface Part {
  text: string;
}

export const getGeminiResponse = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!req.session.conversationContext) {
      req.session.conversationContext = [];
    }

    // Thêm vào session thay vì mảng tĩnh
    req.session.conversationContext.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    // Giới hạn session chỉ giữ 10 lượt trò chuyện gần nhất
    if (req.session.conversationContext.length > 10) {
      req.session.conversationContext =
        req.session.conversationContext.slice(-10);
    }

    const currentMessage = req.session.conversationContext.map(
      ({ role, parts }) => ({
        role,
        parts: parts.map((part) => ({ text: part.text })),
      })
    );

    const chat = model.startChat({ history: currentMessage });
    const result = await chat.sendMessage(prompt);
    const responseText = await result.response.text();

    // Cập nhật session với phản hồi từ mô hình
    req.session.conversationContext.push({
      role: "model",
      parts: [{ text: responseText }],
    });

    // Lại giới hạn session chỉ giữ 10 lượt trò chuyện gần nhất
    if (req.session.conversationContext.length > 10) {
      req.session.conversationContext =
        req.session.conversationContext.slice(-10);
    }

    res.send(responseText);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing the request.");
  }
};
