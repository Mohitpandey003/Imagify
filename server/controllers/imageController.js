import userModel from "../Models/userModels.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "No credit balance", creditBalance: user.creditBalance });
        }

        // Create form data correctly
        const formData = new FormData();
        formData.append("prompt", prompt);

        // Send request with correct headers
        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    ...formData.getHeaders(), // includes 'Content-Type' with boundary
                    'x-api-key': process.env.CLIPDROP_API,
                },
                responseType: 'arraybuffer'
            }
        );

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Update user credit
        const newCreditBalance = user.creditBalance - 1;
        await userModel.findByIdAndUpdate(user._id, { creditBalance: newCreditBalance });

        res.json({
    success: true,
    message: "Image Generated",
    creditBalance: newCreditBalance,
    resultImage 
    });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
