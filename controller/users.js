const Users = require('./../model/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = new Users();

module.exports.userSignup=(req,res)=>{
    const {name,email,password}= req.body;
    if (!name|!email|!password) {
        return res.status(400).json({error:"all fields are required"});
    }

    users.userSignup(name,email,password).then((result)=>{
        res.status(200).json({message:"user signed up successfully"});
    }).catch((error)=>{
        res.status(400).json({error:error.message});
    });
};
module.exports.login =async(req, res, next) => {
  
    
    const JWT_SECRET_KEY = 'sherazi1234%hjk';
    try {
        const { email,password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'Bad request' });
        }

        const user = new Users();
        const [result] = await user.check_login(email);

        if (result.length > 0) {
            const row = result[0];
            const passwordMatch = await bcrypt.compare(password, row.password);
            if (passwordMatch) {
                
                const token = jwt.sign({
                    userExist: true,
                    type:'user',
                    id: row.id,
                    email: row.email,
                    name: row.name,
                status:row.status}, JWT_SECRET_KEY, { expiresIn: '5h' });
                const cat_item = {
                    userExist: true,
                    token: token,
                    type:'user',
                    id: row.id,
                    email: row.email,
                    name: row.name,
                    status:row.status
                };
    
                return res.status(200).json(cat_item);
            }
            else{
                return res.status(400).json({error:"username or password incorrect"});
            }
           
        } else {
           
         return res.status(400).json({error:"username or password incorrect"});
                }
            }
        
     catch (error) {
        return next({ code: error.status, message: error.message });
    }
};


module.exports.checkSession =async(req, res, next) => {
   
    const JWT_SECRET_KEY = 'sherazi1234%hjk';
    const token = req.headers.authorization;
  
    if (!token) {
        return res.status(401).json({ message: 'Token not provided.' });
    }
  
    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: 'Token verification failed.' });
        }
       return res.status(200).json(decoded);
    });
  };

