import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from "../config/credentials.js";



//Llave para generar el Token
export const generateToken = user => {

    const token = jwt.sign({ user }, config.PRIVATE_KEY, {

        expiresIn: '24h',
    })

    return token

}

export const authToken = (req, res, next) => {

    const cookieName = config.COOKIE_NAME;

    const authToken = req.cookies[cookieName];

    if (!authToken) return res.status(401).render('errors', { error: 'No aAuth' })


    jwt.verify(authToken, config.PRIVATE_KEY, (error, credentials) => {

        if (error)

            return res.status(403).render('errors', {

                error: 'No authorized'
            })

        req.user = credentials.user;
        next();

    })

    console.log(authToken)

}

export const passportCall = (strategy) => {

    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err)
            if (!user) return res.status(401).render('errors', { error: info.messages ? info.messages : info.toString() })

            req.user = user
            next()
        })(req, res, next)
    }
}


export const authPolicies = (policies) => (req, res, next) => {


    const role = req.user.role;

    if (!policies.includes(role)) {

        return res
            .status(400)
            .render("errors", { error: "Not Authorized from Policies" });

    }

    next()


}




