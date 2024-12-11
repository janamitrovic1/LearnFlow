-- CreateTable
CREATE TABLE `SQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `questionType` ENUM('INPUT', 'RADIO', 'CHECK') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SResponse` (
    `id` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `responseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SQuestion` ADD CONSTRAINT `SQuestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `SQuiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SResponse` ADD CONSTRAINT `SResponse_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `SQuestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SAnswer` ADD CONSTRAINT `SAnswer_responseId_fkey` FOREIGN KEY (`responseId`) REFERENCES `SResponse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
