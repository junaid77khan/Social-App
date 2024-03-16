import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    boolLike,
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middlware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").get(toggleVideoLike);
router.route("/toggle/c/:commentId").get(toggleCommentLike);
router.route("/toggle/t/:tweetId").get(toggleTweetLike);
router.route("/videos").get(getLikedVideos);
router.route("/boolLike/b/:videoId").get(boolLike)

export default router