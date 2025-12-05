import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db';
import { generateToken } from '../middleware/auth';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { login, name, email, password } = req.body;

    // Check if user already exists
    const existingLogin = await prisma.user.findUnique({
      where: { login }
    });

    if (existingLogin) {
      return res.status(400).json({
        success: false,
        error: 'Username already exists'
      });
    }

    const existingEmail = await prisma.user.findFirst({
      where: { email }
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        login,
        name,
        email,
        password: hashedPassword,
        roles: ['DEVELOPER']
      }
    });

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
          xpTotal: user.xpTotal,
          streak: user.streak,
          hearts: user.hearts,
          gems: user.gems,
          league: user.league
        },
        token
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Registration failed'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { login }
    });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last active date
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveDate: new Date() }
    });

    const token = generateToken(user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          league: user.league,
          xpTotal: user.xpTotal,
          streak: user.streak
        },
        token
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GitHub OAuth callback (placeholder)
router.post('/github/callback', async (req, res) => {
  try {
    const { code } = req.body;
    
    // TODO: Exchange code for access token with GitHub
    // TODO: Fetch user data from GitHub
    // TODO: Create or update user in database
    
    res.json({
      success: true,
      message: 'GitHub OAuth not fully implemented yet'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
