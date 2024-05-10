import express from 'express';

const router = express.Router();

router.get(
    '/all-bookings',
    (req, res) => {
        res.send({
            success: true,
            message: 'All Bookings',
            data: []
        });
    }
);

export const BookingRoutes = router;

