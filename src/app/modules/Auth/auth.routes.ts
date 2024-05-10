import express from 'express';

const router = express.Router();

router.get(
    '/all-auth',
    (req, res, next) => {
        res.send({
            success: true,
            message: 'All Auth',
            data: []
        });
        next()
    }
);

export const AuthRoutes = router;

