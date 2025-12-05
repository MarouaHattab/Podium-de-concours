// ========== ENUMS ==========

export enum UserRole {
  CAPTAIN = 'CAPTAIN',
  DEVELOPER = 'DEVELOPER',
  VERIFIER = 'VERIFIER',
  PEDAGOGUE = 'PEDAGOGUE'
}

export enum League {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  RESILIENCE = 'RESILIENCE'
}

export enum LessonType {
  QUIZ = 'QUIZ',
  PRACTICE = 'PRACTICE',
  STORY = 'STORY',
  READING = 'READING'
}

export enum NIRDDomain {
  ACCESSIBILITY = 'ACCESSIBILITY',
  OPEN_SOURCE = 'OPEN_SOURCE',
  SUSTAINABILITY = 'SUSTAINABILITY',
  DIGITAL_SOBRIETY = 'DIGITAL_SOBRIETY',
  RESPONSIBLE_DEVOPS = 'RESPONSIBLE_DEVOPS'
}

export enum MissionStatus {
  AVAILABLE = 'AVAILABLE',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum StoreItemType {
  BOOST_XP = 'BOOST_XP',
  RESTORE_HEART = 'RESTORE_HEART',
  FREEZE_STREAK = 'FREEZE_STREAK',
  CONTENT_UNLOCK = 'CONTENT_UNLOCK'
}

export enum EventType {
  LESSON_COMPLETED = 'LESSON_COMPLETED',
  BADGE_EARNED = 'BADGE_EARNED',
  LEVEL_UP = 'LEVEL_UP',
  STREAK_MILESTONE = 'STREAK_MILESTONE',
  MISSION_SUBMITTED = 'MISSION_SUBMITTED',
  MISSION_VERIFIED = 'MISSION_VERIFIED',
  LEAGUE_PROMOTED = 'LEAGUE_PROMOTED',
  LEAGUE_DEMOTED = 'LEAGUE_DEMOTED',
  TEAM_JOINED = 'TEAM_JOINED'
}

// ========== USER ==========

export interface AccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  screenReader: boolean;
}

export interface User {
  id: string;
  login: string;
  name: string;
  email?: string;
  avatar?: string;
  roles: UserRole[];
  accessibilityPrefs: AccessibilityPreferences;
  hearts: number;
  streak: number;
  lastActiveDate: Date;
  xpTotal: number;
  gems: number;
  league: League;
  teamId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ========== TEAM ==========

export interface TeamSettings {
  accessibility: AccessibilityPreferences;
  goalsNIRD: NIRDDomain[];
  weeklyTargetXP: number;
}

export interface TeamMember {
  userId: string;
  roles: UserRole[];
  joinedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  settings: TeamSettings;
  totalPoints: number;
  momentumScore: number;
  teamXP: number;
  badges: string[];
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
}

// ========== PATH / LESSONS ==========

export interface Unit {
  id: string;
  title: string;
  description: string;
  domain: NIRDDomain;
  order: number;
  isCheckpoint: boolean;
  requiredUnitId?: string;
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StoryChoice {
  text: string;
  consequence: string;
  xpModifier: number;
}

export interface LessonContent {
  quiz?: QuizQuestion[];
  storyText?: string;
  storyChoices?: StoryChoice[];
  readingContent?: string;
  practiceInstructions?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  type: LessonType;
  difficulty: number;
  xpReward: number;
  heartCost: number;
  content: LessonContent;
  order: number;
  createdAt: Date;
}

export interface LessonAttempt {
  id: string;
  userId: string;
  lessonId: string;
  result: 'PASS' | 'FAIL';
  errorsCount: number;
  xpEarned: number;
  heartsUsed: number;
  answers?: any;
  timestamp: Date;
}

// ========== MISSIONS ==========

export interface MissionRequirement {
  type: 'CI_TEST' | 'LIGHTHOUSE_SCORE' | 'MANUAL_REVIEW' | 'CODE_QUALITY';
  criteria: string;
  threshold?: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  categoryNIRD: NIRDDomain;
  points: number;
  xpReward: number;
  gemsReward: number;
  requirements: MissionRequirement[];
  status: MissionStatus;
  difficulty: number;
  createdAt: Date;
}

export interface Submission {
  id: string;
  teamId: string;
  missionId: string;
  userId: string;
  status: SubmissionStatus;
  repositoryUrl?: string;
  ciRunId?: string;
  ciResult?: any;
  verifierId?: string;
  verifierNotes?: string;
  timestamp: Date;
  verifiedAt?: Date;
}

// ========== BADGES ==========

export interface BadgeCriteria {
  type: 'LESSONS_COMPLETED' | 'STREAK' | 'XP_THRESHOLD' | 'MISSION_VERIFIED' | 'DOMAIN_MASTERY';
  domain?: NIRDDomain;
  count?: number;
  threshold?: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: BadgeCriteria;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  createdAt: Date;
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: Date;
}

// ========== PROGRESS ==========

export interface DomainProgress {
  domain: NIRDDomain;
  xp: number;
  level: number;
  lessonsCompleted: number;
  missionsCompleted: number;
}

export interface UserProgress {
  userId: string;
  hearts: number;
  streak: number;
  xpTotal: number;
  gems: number;
  league: League;
  domains: DomainProgress[];
  badges: Badge[];
  activeBoosters: ActiveBooster[];
}

export interface ActiveBooster {
  type: StoreItemType;
  expiresAt: Date;
}

// ========== STORE ==========

export interface StoreItem {
  id: string;
  title: string;
  description: string;
  type: StoreItemType;
  costGems: number;
  effect: any;
  icon: string;
  available: boolean;
}

// ========== LEAGUES ==========

export interface LeagueUserRank {
  userId: string;
  userName: string;
  avatar?: string;
  xp: number;
  rank: number;
  trend: 'UP' | 'DOWN' | 'SAME';
}

export interface LeagueTeamRank {
  teamId: string;
  teamName: string;
  teamXP: number;
  rank: number;
  trend: 'UP' | 'DOWN' | 'SAME';
}

export interface LeagueSnapshot {
  id: string;
  league: League;
  week: number;
  year: number;
  userRanks: LeagueUserRank[];
  teamRanks: LeagueTeamRank[];
  promotedUsers: string[];
  demotedUsers: string[];
  createdAt: Date;
}

// ========== EVENTS ==========

export interface EventLog {
  id: string;
  type: EventType;
  userId?: string;
  teamId?: string;
  payload: any;
  createdAt: Date;
}

// ========== LEADERBOARD ==========

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar?: string;
  teamId?: string;
  teamName?: string;
  points: number;
  momentumScore: number;
  xpTotal: number;
  league: League;
  badgesCount: number;
  trend: 'UP' | 'DOWN' | 'SAME';
  rank: number;
}

// ========== FLASH QUESTS ==========

export interface FlashQuest {
  id: string;
  title: string;
  description: string;
  domain: NIRDDomain;
  xpReward: number;
  gemsReward: number;
  duration: number; // in minutes
  startsAt: Date;
  endsAt: Date;
  active: boolean;
}

// ========== API RESPONSES ==========

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
