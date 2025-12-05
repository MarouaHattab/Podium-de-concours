-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CAPTAIN', 'DEVELOPER', 'VERIFIER', 'PEDAGOGUE');

-- CreateEnum
CREATE TYPE "League" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'RESILIENCE');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('QUIZ', 'PRACTICE', 'STORY', 'READING');

-- CreateEnum
CREATE TYPE "NIRDDomain" AS ENUM ('ACCESSIBILITY', 'OPEN_SOURCE', 'SUSTAINABILITY', 'DIGITAL_SOBRIETY', 'RESPONSIBLE_DEVOPS');

-- CreateEnum
CREATE TYPE "MissionStatus" AS ENUM ('AVAILABLE', 'IN_PROGRESS', 'SUBMITTED', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "StoreItemType" AS ENUM ('BOOST_XP', 'RESTORE_HEART', 'FREEZE_STREAK', 'CONTENT_UNLOCK');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('LESSON_COMPLETED', 'BADGE_EARNED', 'LEVEL_UP', 'STREAK_MILESTONE', 'MISSION_SUBMITTED', 'MISSION_VERIFIED', 'LEAGUE_PROMOTED', 'LEAGUE_DEMOTED', 'TEAM_JOINED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "avatar" TEXT,
    "roles" "UserRole"[],
    "accessibilityPrefs" JSONB NOT NULL DEFAULT '{"highContrast":false,"reducedMotion":false,"fontSize":"medium","screenReader":false}',
    "hearts" INTEGER NOT NULL DEFAULT 5,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xpTotal" INTEGER NOT NULL DEFAULT 0,
    "gems" INTEGER NOT NULL DEFAULT 0,
    "league" "League" NOT NULL DEFAULT 'BRONZE',
    "teamId" TEXT,
    "githubId" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "settings" JSONB NOT NULL DEFAULT '{"accessibility":{"highContrast":false,"reducedMotion":false,"fontSize":"medium","screenReader":false},"goalsNIRD":[],"weeklyTargetXP":1000}',
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "momentumScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "teamXP" INTEGER NOT NULL DEFAULT 0,
    "inviteCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "domain" "NIRDDomain" NOT NULL,
    "order" INTEGER NOT NULL,
    "isCheckpoint" BOOLEAN NOT NULL DEFAULT false,
    "requiredUnitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "LessonType" NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "xpReward" INTEGER NOT NULL DEFAULT 10,
    "heartCost" INTEGER NOT NULL DEFAULT 0,
    "content" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "errorsCount" INTEGER NOT NULL DEFAULT 0,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "heartsUsed" INTEGER NOT NULL DEFAULT 0,
    "answers" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryNIRD" "NIRDDomain" NOT NULL,
    "points" INTEGER NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "gemsReward" INTEGER NOT NULL DEFAULT 0,
    "requirements" JSONB NOT NULL,
    "status" "MissionStatus" NOT NULL DEFAULT 'AVAILABLE',
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "repositoryUrl" TEXT,
    "ciRunId" TEXT,
    "ciResult" JSONB,
    "verifierId" TEXT,
    "verifierNotes" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "criteria" JSONB NOT NULL,
    "rarity" TEXT NOT NULL DEFAULT 'COMMON',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("userId","badgeId")
);

-- CreateTable
CREATE TABLE "TeamBadge" (
    "teamId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamBadge_pkey" PRIMARY KEY ("teamId","badgeId")
);

-- CreateTable
CREATE TABLE "DomainProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "domain" "NIRDDomain" NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "missionsCompleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DomainProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveBooster" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "StoreItemType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveBooster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "StoreItemType" NOT NULL,
    "costGems" INTEGER NOT NULL,
    "effect" JSONB NOT NULL,
    "icon" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeagueSnapshot" (
    "id" TEXT NOT NULL,
    "league" "League" NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "userRanks" JSONB NOT NULL,
    "teamRanks" JSONB NOT NULL,
    "promotedUsers" TEXT[],
    "demotedUsers" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeagueSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "userId" TEXT,
    "teamId" TEXT,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashQuest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "domain" "NIRDDomain" NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "gemsReward" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlashQuest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE INDEX "User_league_idx" ON "User"("league");

-- CreateIndex
CREATE INDEX "User_teamId_idx" ON "User"("teamId");

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_inviteCode_key" ON "Team"("inviteCode");

-- CreateIndex
CREATE INDEX "Team_teamXP_idx" ON "Team"("teamXP");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_domain_order_key" ON "Unit"("domain", "order");

-- CreateIndex
CREATE INDEX "Lesson_unitId_idx" ON "Lesson"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_unitId_order_key" ON "Lesson"("unitId", "order");

-- CreateIndex
CREATE INDEX "LessonAttempt_userId_idx" ON "LessonAttempt"("userId");

-- CreateIndex
CREATE INDEX "LessonAttempt_lessonId_idx" ON "LessonAttempt"("lessonId");

-- CreateIndex
CREATE INDEX "Mission_categoryNIRD_idx" ON "Mission"("categoryNIRD");

-- CreateIndex
CREATE INDEX "Mission_status_idx" ON "Mission"("status");

-- CreateIndex
CREATE INDEX "Submission_teamId_idx" ON "Submission"("teamId");

-- CreateIndex
CREATE INDEX "Submission_missionId_idx" ON "Submission"("missionId");

-- CreateIndex
CREATE INDEX "Submission_status_idx" ON "Submission"("status");

-- CreateIndex
CREATE INDEX "DomainProgress_userId_idx" ON "DomainProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DomainProgress_userId_domain_key" ON "DomainProgress"("userId", "domain");

-- CreateIndex
CREATE INDEX "ActiveBooster_userId_idx" ON "ActiveBooster"("userId");

-- CreateIndex
CREATE INDEX "ActiveBooster_expiresAt_idx" ON "ActiveBooster"("expiresAt");

-- CreateIndex
CREATE INDEX "StoreItem_type_idx" ON "StoreItem"("type");

-- CreateIndex
CREATE INDEX "StoreItem_available_idx" ON "StoreItem"("available");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueSnapshot_league_week_year_key" ON "LeagueSnapshot"("league", "week", "year");

-- CreateIndex
CREATE INDEX "EventLog_type_idx" ON "EventLog"("type");

-- CreateIndex
CREATE INDEX "EventLog_userId_idx" ON "EventLog"("userId");

-- CreateIndex
CREATE INDEX "EventLog_teamId_idx" ON "EventLog"("teamId");

-- CreateIndex
CREATE INDEX "EventLog_createdAt_idx" ON "EventLog"("createdAt");

-- CreateIndex
CREATE INDEX "FlashQuest_active_idx" ON "FlashQuest"("active");

-- CreateIndex
CREATE INDEX "FlashQuest_endsAt_idx" ON "FlashQuest"("endsAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_requiredUnitId_fkey" FOREIGN KEY ("requiredUnitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAttempt" ADD CONSTRAINT "LessonAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAttempt" ADD CONSTRAINT "LessonAttempt_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamBadge" ADD CONSTRAINT "TeamBadge_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamBadge" ADD CONSTRAINT "TeamBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainProgress" ADD CONSTRAINT "DomainProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveBooster" ADD CONSTRAINT "ActiveBooster_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
