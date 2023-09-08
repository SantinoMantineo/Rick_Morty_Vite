const users = require("../utils/users")
const {clearFavorites} = require("./handleFavorites")

const login = (req, res)=>{
    const { email, password } = req.query;

    const user = users.find((user) => user.email === email && user.password === password);

    if(user){
        res.status(200).json({access: true})
        clearFavorites(req, res);
    } else{
        res.status(200).json({access: false})
    }
}

module.exports= {login}