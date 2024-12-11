-- CreateTable
CREATE TABLE `SQuiz` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeacherQuizzes` (
    `teacherId` VARCHAR(191) NOT NULL,
    `quizzId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teacherId`, `quizzId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SQuiz` ADD CONSTRAINT `SQuiz_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherQuizzes` ADD CONSTRAINT `TeacherQuizzes_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherQuizzes` ADD CONSTRAINT `TeacherQuizzes_quizzId_fkey` FOREIGN KEY (`quizzId`) REFERENCES `SQuiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
