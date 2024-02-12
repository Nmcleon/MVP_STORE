import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@test.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: bcrypt.hashSync('john123', 10),
        isAdmin: false
    },
    {
        name: 'Lara Pink',
        email: 'lara@test.com',
        password: bcrypt.hashSync('lara123', 10),
        isAdmin: false
    },
	
]

export default users