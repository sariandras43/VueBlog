import jsonServer from 'json-server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const SECRET_KEY = 'your-secret-key'
const expiresIn = '1h'

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Create a token
const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

// Register endpoint
server.post('/register', (req, res) => {
  const { name, email, password } = req.body

  if (router.db.get('users').find({ email }).value()) {
    return res.status(400).json({ message: 'Email már használatban van' })
  }

  const hashedPassword = bcrypt.hashSync(password, 8)
  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  }

  router.db.get('users').push(user).write()

  const accessToken = createToken({ email, name })
  res.status(200).json({ token: accessToken, user: { id: user.id, name, email } })
})

// Login endpoint
server.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = router.db.get('users').find({ email }).value()

  if (!user) {
    return res.status(400).json({ message: 'Felhasználó nem található' })
  }

  const validPassword = bcrypt.compareSync(password, user.password)
  if (!validPassword) {
    return res.status(400).json({ message: 'Hibás jelszó' })
  }

  const accessToken = createToken({ email, name: user.name })
  res.status(200).json({ token: accessToken, user: { id: user.id, name: user.name, email } })
})

// Profil frissítése endpoint
server.put('/profile/update', (req, res) => {
  const { id, name, email } = req.body

  const user = router.db
    .get('users')
    .find({ id: parseInt(id) })
    .value()

  if (!user) {
    return res.status(400).json({ message: 'Felhasználó nem található' })
  }

  // Email egyediség ellenőrzése, ha változott
  if (email !== user.email) {
    const existingUser = router.db.get('users').find({ email }).value()
    if (existingUser) {
      return res.status(400).json({ message: 'Ez az email cím már használatban van' })
    }
  }

  // Felhasználó adatainak frissítése
  router.db
    .get('users')
    .find({ id: parseInt(id) })
    .assign({ name, email })
    .write()

  res.status(200).json({ message: 'Profil sikeresen frissítve', user: { id, name, email } })
})

// Jelszó változtatás endpoint
server.put('/profile/change-password', (req, res) => {
  const { id, currentPassword, newPassword } = req.body

  const user = router.db
    .get('users')
    .find({ id: parseInt(id) })
    .value()

  if (!user) {
    return res.status(400).json({ message: 'Felhasználó nem található' })
  }

  // Jelenlegi jelszó ellenőrzése
  const validPassword = bcrypt.compareSync(currentPassword, user.password)
  if (!validPassword) {
    return res.status(400).json({ message: 'A jelenlegi jelszó helytelen' })
  }

  // Új jelszó hashelése és mentése
  const hashedPassword = bcrypt.hashSync(newPassword, 8)
  router.db
    .get('users')
    .find({ id: parseInt(id) })
    .assign({ password: hashedPassword })
    .write()

  res.status(200).json({ message: 'Jelszó sikeresen megváltoztatva' })
})

server.get("/posts",(req,res,next)=>{
  return res.status(200).json(router.db.get('posts').value())
})
// Protected endpoint middleware
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    return res.status(401).json({ message: 'Hiányzó token' })
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    res.status(401).json({ message: 'Érvénytelen vagy lejárt token' })
  }
})


server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
