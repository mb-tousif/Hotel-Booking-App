import express from 'express';

const router = express.Router();

router.get(
    '/all-users',
    (req, res, next) => {
        res.send({
            success: true,
            message: 'All Users',
            data: []
        });
        next()
    }
);

export const UserRoutes = router;

