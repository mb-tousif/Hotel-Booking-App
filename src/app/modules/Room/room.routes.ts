import express from 'express';

const router = express.Router();

router.get(
    '/all-rooms',
    (req, res) => {
        res.send({
            success: true,
            message: 'All Rooms',
            data: []
        });
    }
);

export const roomRoutes = router;

