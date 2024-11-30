const supportHistoryRepo = require('../repositories/SupportHistoryRepository');
const nodemailer = require('nodemailer');
require('dotenv').config();

class SupportOrdersService {
    async getAllOrders() {
        return await supportHistoryRepo.findAll();
    }

    async updateStatus(id, status, technicianMssv) {
        const order = await supportHistoryRepo.findById(id);
        if (!order) throw new Error('Không tìm thấy yêu cầu');

        if (status === 'tiếp nhận' || status === 'từ chối') {
            order.mssv = technicianMssv;
        }

        order.trangthai = status;
        const updatedOrder = await supportHistoryRepo.update(id, order);

        let message = 'Cập nhật trạng thái thành công';

        // Gửi email khi trạng thái là "bàn giao máy"
        if (status === 'bàn giao máy') {
            if (order.email) {
                await this.sendCompletionEmail(order);
                message =
                    'Cập nhật trạng thái và gửi email thông báo thành công';
            } else {
                message =
                    'Cập nhật trạng thái thành công (không có email để gửi thông báo)';
            }
        }

        return {
            data: updatedOrder,
            message: message,
        };
    }

    async updateOrder(id, data, technicianMssv) {
        const order = await supportHistoryRepo.findById(id);
        if (!order) throw new Error('Không tìm thấy yêu cầu');
        if (order.mssv !== technicianMssv) {
            throw new Error('Không có quyền chỉnh sửa');
        }
        return await supportHistoryRepo.update(id, data);
    }

    async deleteOrder(id, technicianMssv, role) {
        const order = await supportHistoryRepo.findById(id);
        if (!order) throw new Error('Không tìm thấy yêu cầu');
        if (order.mssv !== technicianMssv && role !== 'admin') {
            throw new Error('Không có quyền xóa');
        }
        return await supportHistoryRepo.delete(id);
    }

    async sendCompletionEmail(order) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: `"IT Center 👨‍💻" <${process.env.EMAIL_USER}>`,
                to: order.email,
                subject: 'Thông báo hoàn thành yêu cầu hỗ trợ',
                html: `
                    <div style="background-color: #f6f6f6; padding: 20px;">
                        <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
                            <h2 style="color: #333;">Thông báo hoàn thành yêu cầu</h2>
                            <p>Xin chào ${order.hoten},</p>
                            <p>Yêu cầu hỗ trợ của bạn đã được hoàn thành:</p>
                            <ul>
                                <li>Tên máy: ${order.tenmay}</li>
                                <li>Loại hỗ trợ: ${order.loaihotro}</li>
                                <li>Ngày gửi: ${new Date(order.ngaygui).toLocaleDateString('vi-VN')}</li>
                            </ul>
                            <p>Vui lòng kiểm tra và phản hồi nếu cần thêm hỗ trợ.</p>
                            <p>Trân trọng,</p>
                            <p>IT Center</p>
                        </div>
                    </div>
                `,
            });

            return true;
        } catch (error) {
            console.error('Email error:', error);
            throw new Error('Lỗi khi gửi email thông báo');
        }
    }
}

module.exports = new SupportOrdersService();
