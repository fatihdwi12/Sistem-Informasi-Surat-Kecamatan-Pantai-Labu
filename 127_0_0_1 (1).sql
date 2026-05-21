-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2025 at 04:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aej`
--
CREATE DATABASE IF NOT EXISTS `aej` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `aej`;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `description`, `content`, `image_url`, `published_at`) VALUES
(1, 'MAN 2 DELI SERDANG BERJAYA ', 'MAN 2 DELI SERDANG BERHASIL MEMENANGKAN KARYA LOMBA TULIS TANGAN DENGAN BAIK DAN MUDAH ', 'KEMENANGAN INI DIRAIH ATAS PREDIKAT PENGHARGAAN ', 'https://www.armadaberita.com/wp-content/uploads/2021/10/IMG-20211012-WA0029_crop_7.jpg', '2025-08-25 17:14:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Database: `berita_db`
--
CREATE DATABASE IF NOT EXISTS `berita_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `berita_db`;
--
-- Database: `laravel`
--
CREATE DATABASE IF NOT EXISTS `laravel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `laravel`;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(5, '2025_08_29_155609_add_role_to_users_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('dS8zJ2dF1lufO4985YOaMefCrVAX5DFoCSnyVnDz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTVFpYWlOOXZOeXR1b3VyMDN1NEltWnhFVGc0WE1FSEh3ajRxZzZGNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1756485680);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `manajemen_surat`
--
CREATE DATABASE IF NOT EXISTS `manajemen_surat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `manajemen_surat`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(3, 'balqis@gmail.com', '$2b$10$yxvxfmeeC8WfC4SojrEcdu.ZWuF0hR98K6LXvnMbKJzUayzMeHSaG'),
(4, 'superadmin', '$2a$12$IlmF2SP0co99Is5FIf6bWenG9RRKBeE5vsm9JHaz8WEFCz7DPSF0m');

-- --------------------------------------------------------

--
-- Table structure for table `surat`
--

CREATE TABLE `surat` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` enum('masuk','disposisi','proses') DEFAULT 'masuk',
  `disposition_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `surat_masuk`
--

CREATE TABLE `surat_masuk` (
  `id` int(11) NOT NULL,
  `nomor_agenda` varchar(255) NOT NULL,
  `tanggal_masuk` date NOT NULL,
  `pengirim_surat` varchar(255) DEFAULT NULL,
  `tanggal_surat` date NOT NULL,
  `isi_ringkasan` text DEFAULT NULL,
  `penanggung_jawab` varchar(255) DEFAULT NULL,
  `tujuan_surat` varchar(255) DEFAULT NULL,
  `file_surat` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) DEFAULT 'belum diproses',
  `petugas_id` int(11) DEFAULT NULL,
  `pesan` text DEFAULT NULL,
  `status_tindak_lanjut` varchar(20) DEFAULT 'Belum',
  `nomor_surat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surat_masuk`
--

INSERT INTO `surat_masuk` (`id`, `nomor_agenda`, `tanggal_masuk`, `pengirim_surat`, `tanggal_surat`, `isi_ringkasan`, `penanggung_jawab`, `tujuan_surat`, `file_surat`, `created_at`, `status`, `petugas_id`, `pesan`, `status_tindak_lanjut`, `nomor_surat`) VALUES
(42, '22', '2025-09-17', 'Kecamatan Lubuk Paka,', '2025-09-18', 'Undangan', 'Subbag Umum', '21', 'file_surat-1758809509736-37900019.pdf', '2025-09-25 14:11:49', 'disposisi', 19, 'segera dikerjakan', 'Belum', '879/po/2253/2025');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','camat','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(7, 'camat.pantailabu', '$2b$10$.W6aEIWSaVDgf3KKZlGD0.sI2gvb/rX/0DoJ8lTHIlhuM/QaVnNl2', 'camat', '2025-08-31 16:26:14', '2025-09-17 05:40:15'),
(10, 'pencatatsurat.pantailabu', '$2b$10$SEurosC294OIvUtwWHHaneUEqey1X.9BFF/MOV5dPoOJb/o4PyMVK', 'admin', '2025-09-01 17:09:30', '2025-09-15 11:35:08'),
(14, 'kasubbagumpeg.pantailabu', '$2b$10$nE8zrqS/wqpUHakcoqXxqexfeGySTzECg93ib7fCm76b6BP2SM3aO', 'user', '2025-09-01 18:21:51', '2025-09-15 11:35:50'),
(15, 'subbagbaru22', '$2b$10$2h3w4NfgTij5L3Bi/3a.q.7l2lYM3UzRRebgeU19p5/07nTKJT4We', 'user', '2025-09-01 18:41:39', '2025-09-01 18:41:39'),
(16, 'fatihdwi12', '$2b$10$Pl1lwwaERTka5pW4NURsIOnTjVkLGXBN8v62UogQPjfw2eqGvqSzi', 'camat', '2025-09-02 09:34:26', '2025-09-02 09:34:26'),
(17, 'ridho12', '$2b$10$0uOEjmjGE.wHyH7g8tSi.eBvNQDZ581dqNt4MHe5.YrAdeeNn5Z0G', 'user', '2025-09-02 14:18:30', '2025-09-04 14:13:25'),
(19, 'papa1', '$2b$10$Py30RWaU6YnZwk3VaMM1t.z/TS7QBAA6NUpHc9qlP56I95cIBf7ky', 'user', '2025-09-08 07:57:02', '2025-09-25 09:06:29'),
(21, 'sekcam.pantailabu', '$2b$10$4nAd4VPsXd1ksuMAbpyr1eqYpX.pbFGgX1m8LdhCr8jbrs/UKfxuK', 'camat', '2025-09-25 09:24:05', '2025-09-25 09:24:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `surat`
--
ALTER TABLE `surat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `surat_masuk`
--
ALTER TABLE `surat_masuk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `surat`
--
ALTER TABLE `surat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surat_masuk`
--
ALTER TABLE `surat_masuk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

--
-- Dumping data for table `pma__export_templates`
--

INSERT INTO `pma__export_templates` (`id`, `username`, `export_type`, `template_name`, `template_data`) VALUES
(1, 'root', 'server', 'manajemen_surat', '{\"quick_or_custom\":\"quick\",\"what\":\"sql\",\"db_select[]\":[\"aej\",\"berita_db\",\"laravel\",\"manajemen_surat\",\"phpmyadmin\",\"psb\",\"rentalmobil\",\"siukm\",\"surat\",\"test\"],\"aliases_new\":\"\",\"output_format\":\"sendit\",\"filename_template\":\"@SERVER@\",\"remember_template\":\"on\",\"charset\":\"utf-8\",\"compression\":\"none\",\"maxsize\":\"\",\"codegen_structure_or_data\":\"data\",\"codegen_format\":\"0\",\"csv_separator\":\",\",\"csv_enclosed\":\"\\\"\",\"csv_escaped\":\"\\\"\",\"csv_terminated\":\"AUTO\",\"csv_null\":\"NULL\",\"csv_columns\":\"something\",\"csv_structure_or_data\":\"data\",\"excel_null\":\"NULL\",\"excel_columns\":\"something\",\"excel_edition\":\"win\",\"excel_structure_or_data\":\"data\",\"json_structure_or_data\":\"data\",\"json_unicode\":\"something\",\"latex_caption\":\"something\",\"latex_structure_or_data\":\"structure_and_data\",\"latex_structure_caption\":\"Structure of table @TABLE@\",\"latex_structure_continued_caption\":\"Structure of table @TABLE@ (continued)\",\"latex_structure_label\":\"tab:@TABLE@-structure\",\"latex_relation\":\"something\",\"latex_comments\":\"something\",\"latex_mime\":\"something\",\"latex_columns\":\"something\",\"latex_data_caption\":\"Content of table @TABLE@\",\"latex_data_continued_caption\":\"Content of table @TABLE@ (continued)\",\"latex_data_label\":\"tab:@TABLE@-data\",\"latex_null\":\"\\\\textit{NULL}\",\"mediawiki_structure_or_data\":\"data\",\"mediawiki_caption\":\"something\",\"mediawiki_headers\":\"something\",\"htmlword_structure_or_data\":\"structure_and_data\",\"htmlword_null\":\"NULL\",\"ods_null\":\"NULL\",\"ods_structure_or_data\":\"data\",\"odt_structure_or_data\":\"structure_and_data\",\"odt_relation\":\"something\",\"odt_comments\":\"something\",\"odt_mime\":\"something\",\"odt_columns\":\"something\",\"odt_null\":\"NULL\",\"pdf_report_title\":\"\",\"pdf_structure_or_data\":\"data\",\"phparray_structure_or_data\":\"data\",\"sql_include_comments\":\"something\",\"sql_header_comment\":\"\",\"sql_use_transaction\":\"something\",\"sql_compatibility\":\"NONE\",\"sql_structure_or_data\":\"structure_and_data\",\"sql_create_table\":\"something\",\"sql_auto_increment\":\"something\",\"sql_create_view\":\"something\",\"sql_create_trigger\":\"something\",\"sql_backquotes\":\"something\",\"sql_type\":\"INSERT\",\"sql_insert_syntax\":\"both\",\"sql_max_query_size\":\"50000\",\"sql_hex_for_binary\":\"something\",\"sql_utc_time\":\"something\",\"texytext_structure_or_data\":\"structure_and_data\",\"texytext_null\":\"NULL\",\"yaml_structure_or_data\":\"data\",\"\":null,\"as_separate_files\":null,\"csv_removeCRLF\":null,\"excel_removeCRLF\":null,\"json_pretty_print\":null,\"htmlword_columns\":null,\"ods_columns\":null,\"sql_dates\":null,\"sql_relation\":null,\"sql_mime\":null,\"sql_disable_fk\":null,\"sql_views_as_tables\":null,\"sql_metadata\":null,\"sql_drop_database\":null,\"sql_drop_table\":null,\"sql_if_not_exists\":null,\"sql_simple_view_export\":null,\"sql_view_current_user\":null,\"sql_or_replace_view\":null,\"sql_procedure_function\":null,\"sql_truncate\":null,\"sql_delayed\":null,\"sql_ignore\":null,\"texytext_columns\":null}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"manajemen_surat\",\"table\":\"surat_masuk\"},{\"db\":\"manajemen_surat\",\"table\":\"users\"},{\"db\":\"psb\",\"table\":\"akun\"},{\"db\":\"psb\",\"table\":\"siswa\"},{\"db\":\"rentalmobil\",\"table\":\"admin\"},{\"db\":\"rentalmobil\",\"table\":\"akun\"},{\"db\":\"rentalmobil\",\"table\":\"rentcar\"},{\"db\":\"manajemen_surat\",\"table\":\"admins\"},{\"db\":\"manajemen_surat\",\"table\":\"surat\"},{\"db\":\"laravel\",\"table\":\"users\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-09-25 07:40:46', '{\"Console\\/Mode\":\"collapse\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `psb`
--
CREATE DATABASE IF NOT EXISTS `psb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `psb`;

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `Id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nama_admin` varchar(255) DEFAULT NULL,
  `role_user` varchar(255) DEFAULT NULL,
  `id_user` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`Id`, `email`, `password`, `nama_admin`, `role_user`, `id_user`) VALUES
(2, 'admin@gmail.com', 'fatihdwi12', 'Fatih', '0', NULL),
(19, 'anggitprayogo@gmail.com', '$2y$10$reSEF5KQSOWr.7MQeqzlqeDDy3dyOZWT9EdZW.fmGgHRjo852WlYi', '', '1', 8),
(20, 'ruben@gmail.com', '$2y$10$GK/Vsz.N/wTbKijTQw31qOgTZFqeLNwZgofVP0Nst4zJ/XFmwKEoa', '', '1', 9),
(21, 'rifat@gmail.com', '$2y$10$gg12u7EggBdGgI7lO6ZC2eeF3vmfsEJjAqiFyrrjptYvESBu//PEy', '', '1', 10),
(22, 'dwi@gmail.com', '$2y$10$Gg7xOo4Uns1jP5AWxjT.f.VUEWZt4uyqjF0Or38/57ufFugByFhiu', '', '1', 11),
(23, 'tih@gmail.com', '$2y$10$d3Cg2E9gX6/dqfhOrBnoLeaXmHH.R7iN7w16w8s0mFra7P5AGwJ6y', '', '1', 12),
(24, 'aryo@gmail.com', '$2y$10$Y/ZSXcQT9Id1D1YALhfFjODjFos6.d1An6Xzf2zn37BdGeFq9fRdW', '', '1', 13),
(25, 'admin@example.com', '$2y$10$wVw7fpDkFXmJuE/KC4l0..99UP1zWycuvwmSqpby/gzBb3EHS/0RS', 'Fatih ', '0', NULL),
(26, 'fatih@gmail.com', '$2y$10$zKb8DMN.MGG9xVXqihdUnODn78/E9lVJ.Y4VuH6KaW0Htl4LIk4Uy', '', '1', 14);

-- --------------------------------------------------------

--
-- Table structure for table `cicilan_pendaftaran`
--

CREATE TABLE `cicilan_pendaftaran` (
  `Id` int(11) NOT NULL,
  `bukti_pembayaran` varchar(255) DEFAULT NULL,
  `id_detail_pendaftaran` int(11) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `tanggal_pembayaran` varchar(255) DEFAULT NULL,
  `status_cicilan` int(11) NOT NULL,
  `cicilan_ke` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cicilan_pendaftaran`
--

INSERT INTO `cicilan_pendaftaran` (`Id`, `bukti_pembayaran`, `id_detail_pendaftaran`, `nominal`, `tanggal_pembayaran`, `status_cicilan`, `cicilan_ke`) VALUES
(13, '10-12-47test.png', 7, 895000, '2017-12-21', 1, 1),
(16, '04-12-252. Gagal signup (data kurang atau sudah terpakai).PNG', 8, 895000, '2017-12-27', 1, 1),
(17, '10-12-24background2.jpg', 9, 500000, '2017-12-29', 1, 1),
(18, '10-12-11button.png', 9, 395000, '2017-12-29', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `detail_pendaftaran`
--

CREATE TABLE `detail_pendaftaran` (
  `Id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `tanggal_daftar` date DEFAULT NULL,
  `metode_pembayaran_pendaftaran` varchar(255) DEFAULT NULL COMMENT 'metode_pembayaran',
  `kelas` varchar(255) DEFAULT NULL,
  `usia` varchar(255) DEFAULT NULL,
  `status_pendaftaran` varchar(255) DEFAULT NULL,
  `status_kegiatan` int(11) NOT NULL DEFAULT 0,
  `biaya_kegiatan` int(11) DEFAULT 0,
  `tanggal_kegiatan` date DEFAULT NULL,
  `bukti_konfirmasi_pembayaran_kegiatan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `detail_pendaftaran`
--

INSERT INTO `detail_pendaftaran` (`Id`, `id_user`, `id_admin`, `tanggal_daftar`, `metode_pembayaran_pendaftaran`, `kelas`, `usia`, `status_pendaftaran`, `status_kegiatan`, `biaya_kegiatan`, `tanggal_kegiatan`, `bukti_konfirmasi_pembayaran_kegiatan`) VALUES
(7, 8, 2, '2017-12-21', 'L', 'A', '15 tahun 0 bulan', '1', 1, 500000, '2017-12-21', '10-12-59test.png'),
(8, 9, 2, '2017-12-27', 'L', 'B', '8 tahun 11 bulan', '4', 0, 0, NULL, NULL),
(9, 10, 2, '2017-12-29', 'C', 'A', '15 tahun 0 bulan', '1', 0, 0, NULL, NULL),
(10, 11, NULL, '2023-12-30', NULL, NULL, NULL, '0', 0, 0, NULL, NULL),
(11, 12, NULL, '2023-12-30', NULL, NULL, NULL, '0', 0, 0, NULL, NULL),
(12, 13, NULL, '2024-01-04', NULL, NULL, NULL, '0', 0, 0, NULL, NULL),
(13, 14, NULL, '2025-09-22', NULL, NULL, NULL, '0', 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `Id` int(11) NOT NULL,
  `nip` char(7) DEFAULT NULL,
  `nama_guru` varchar(100) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `telp` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`Id`, `nip`, `nama_guru`, `alamat`, `telp`) VALUES
(6, '1171445', 'Fatih Dwi Laksana ', 'Pendidikan Kimia', '08121333254');

-- --------------------------------------------------------

--
-- Table structure for table `hari`
--

CREATE TABLE `hari` (
  `Id` int(11) NOT NULL,
  `nama_hari` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `hari`
--

INSERT INTO `hari` (`Id`, `nama_hari`) VALUES
(1, 'Senin'),
(2, 'Selasa'),
(3, 'Rabu'),
(4, 'Kamis'),
(5, 'Jumat'),
(6, 'PR');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `id_jadwal` int(11) NOT NULL,
  `id_hari` int(11) DEFAULT NULL,
  `id_mapel` varchar(255) DEFAULT NULL,
  `kelas` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id_jadwal`, `id_hari`, `id_mapel`, `kelas`) VALUES
(1, 1, 'P0002', 'A'),
(2, 1, 'P0003', 'A'),
(3, 1, 'P0004', 'A'),
(4, 1, 'P0005', 'A'),
(5, 1, 'P0006', 'A'),
(6, 1, 'P0017', 'A'),
(7, 1, 'P0008', 'A'),
(8, 1, 'P0002', 'B'),
(9, 1, 'P0003', 'B'),
(10, 1, 'P0004', 'B'),
(11, 1, 'P0005', 'B'),
(12, 1, 'P0006', 'B'),
(13, 1, 'P0017', 'B'),
(14, 1, 'P0007', 'B'),
(15, 2, 'P0009', 'B'),
(16, 2, 'P0005', 'B'),
(17, 2, 'P0010', 'B'),
(18, 2, 'P0011', 'B'),
(19, 2, 'P0006', 'B'),
(20, 2, 'P0017', 'B'),
(21, 2, 'P0007', 'B'),
(22, 1, 'P0008', 'B'),
(23, 2, 'P0008', 'B'),
(24, 3, 'P0012', 'B'),
(25, 3, 'P0013', 'B'),
(26, 3, 'P0014', 'B'),
(27, 3, 'P0015', 'B'),
(28, 3, 'P0006', 'B'),
(29, 3, 'P0017', 'B'),
(30, 3, 'P0007', 'B'),
(31, 3, 'P0008', 'B'),
(32, 4, 'P0003', 'B'),
(33, 4, 'P0005', 'B'),
(34, 4, 'P0011', 'B'),
(35, 4, 'P0004', 'B'),
(36, 4, 'P0006', 'B'),
(37, 4, 'P0017', 'B'),
(38, 4, 'P0007', 'B'),
(39, 4, 'P0008', 'B'),
(40, 5, 'P0009', 'B'),
(41, 5, 'P0010', 'B'),
(42, 5, 'P0016', 'B'),
(43, 5, 'P0006', 'B'),
(44, 5, 'P0007', 'B'),
(45, 5, 'P0008', 'B'),
(47, 6, 'P0004', 'B'),
(48, 6, 'P0018', 'B'),
(49, 6, 'P0011', 'B'),
(50, 6, 'P0018', 'B'),
(51, 6, 'P0010', 'B'),
(52, 2, 'P0009', 'A'),
(53, 2, 'P0015', 'A'),
(54, 4, 'P0006', 'A'),
(55, 3, 'P0006', 'A'),
(56, 2, 'P0005', 'A'),
(57, 5, 'P0016', 'A'),
(58, 5, 'P0010', 'A'),
(59, 5, 'P0002', 'A'),
(60, 5, 'P0003', 'A'),
(61, 4, 'P0001', 'A'),
(62, 2, 'P0005', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `kode_mapel_kegiatan` char(5) NOT NULL DEFAULT '',
  `nama_mapel_kegiatan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`kode_mapel_kegiatan`, `nama_mapel_kegiatan`) VALUES
('P0001', 'Filosofi Pendidikan Indonesia'),
('P0002', 'Pemahaman tentang Peserta Didik dan Pembelajarannya'),
('P0003', 'Prinsip Pengajaran dan Asesmen I dan II'),
('P0004', 'Pembelajaran Sosial Emosional'),
('P0005', 'Seminar Pendidikan Profesi Guru'),
('P0006', 'Projek Kepemimpinan'),
('P0007', 'Praktik Pengalaman Lapangan (PPL) I dan II'),
('P0008', 'Literasi dalam Lintas Mata Pelajaran'),
('P0009', 'Teknologi Bar dalam Pengajaran dan Pembelajaran'),
('P0010', 'Pengantar Pendidikan untuk Anak Berkebutuhan Khusus'),
('P0011', 'Perancangan dan Pengembangan Kurikulum'),
('P0012', 'Pembelajaran Berdiferensiasi'),
('P0013', 'Pengajaran dan Pembelajaran Daring dan Bauran'),
('P0014', 'Design Thinking'),
('P0015', 'Computational Thinking'),
('P0016', 'Pendidikan di Daerah Khusus'),
('P0017', 'Perspektif Sosiokultural dalam Pendidikan Indonesia'),
('P0018', 'Bahasa Inggris untuk Guru SD'),
('P0019', 'Inovasi Kejuruan'),
('P0020', 'Budaya Kerja'),
('P0021', 'Pendidikan Kewirausahaan');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran_spp`
--

CREATE TABLE `pembayaran_spp` (
  `Id` int(11) NOT NULL,
  `tanggal_pembayaran_spp` date DEFAULT NULL,
  `cicilan_ke` int(11) NOT NULL,
  `status_spp` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `pembayaran_spp`
--

INSERT INTO `pembayaran_spp` (`Id`, `tanggal_pembayaran_spp`, `cicilan_ke`, `status_spp`, `user_id`) VALUES
(19, '2017-12-21', 1, 1, '8'),
(20, '2017-12-21', 1, 1, '8'),
(21, '2017-12-24', 3, 1, '8'),
(22, '2017-12-24', 4, 1, '8'),
(23, '2017-12-24', 5, 1, '8'),
(24, '2017-12-24', 6, 1, '8'),
(25, '2017-12-27', 1, 1, '9'),
(26, '2017-12-27', 2, 1, '9'),
(27, '2017-12-27', 3, 1, '9'),
(28, '2017-12-27', 4, 1, '9'),
(29, '2017-12-27', 5, 1, '9'),
(30, '2017-12-27', 6, 1, '9'),
(31, '2017-12-27', 1, 1, '9'),
(32, '2017-12-29', 1, 1, '10');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `Id` int(11) NOT NULL,
  `bidang_studi` text DEFAULT NULL,
  `nama_peserta` text DEFAULT NULL,
  `nik` text DEFAULT NULL,
  `nip` text DEFAULT NULL,
  `nuptk` text DEFAULT NULL,
  `no_ukg` text DEFAULT NULL,
  `npwp` text DEFAULT NULL,
  `gelar_depan` text DEFAULT NULL,
  `gelar_belakang` text DEFAULT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `no_hp` text DEFAULT NULL,
  `email_utama` text DEFAULT NULL,
  `email_alternatif` text DEFAULT NULL,
  `jenis_kelamin` char(1) DEFAULT NULL,
  `kewarganegaraan` text DEFAULT NULL,
  `no_paspor` text DEFAULT NULL,
  `kode_negara_asal` text DEFAULT NULL,
  `nim` text DEFAULT NULL,
  `prodi_asal` text DEFAULT NULL,
  `jenjang_asal` text DEFAULT NULL,
  `nomor_rekening` text DEFAULT NULL,
  `nama_norek` text DEFAULT NULL,
  `twitter` text DEFAULT NULL,
  `facebook` text DEFAULT NULL,
  `instagram` text DEFAULT NULL,
  `tiktok` text DEFAULT NULL,
  `nama_kontak_darurat` text DEFAULT NULL,
  `no_darurat` text DEFAULT NULL,
  `institusi_asal` text DEFAULT NULL,
  `kode_institusi` text DEFAULT NULL,
  `nama_ibu` text NOT NULL,
  `nama_ayah` text NOT NULL,
  `agama` text DEFAULT NULL,
  `nama_sekolah` text DEFAULT NULL,
  `npsn_sekolah` text DEFAULT NULL,
  `jenjang_sekolah` text DEFAULT NULL,
  `jab_fungsional` text DEFAULT NULL,
  `alamat_rumah` text DEFAULT NULL,
  `provinsi_rumah` text DEFAULT NULL,
  `kota_kab_rumah` text DEFAULT NULL,
  `desa_rumah` text DEFAULT NULL,
  `kode_pos_rumah` text DEFAULT NULL,
  `sekolah_tempat_ppl` text DEFAULT NULL,
  `npsn` text DEFAULT NULL,
  `nama_kepsek` text DEFAULT NULL,
  `nip_kepsek` text DEFAULT NULL,
  `nik_kepsek` text DEFAULT NULL,
  `no_hp_kepsek` text DEFAULT NULL,
  `jabatan_kepsek` text DEFAULT NULL,
  `alamat_sekolah_ppl` text DEFAULT NULL,
  `norek_kepsek` text DEFAULT NULL,
  `npwp_kepsek` text DEFAULT NULL,
  `upload_akte` varchar(255) DEFAULT NULL,
  `upload_kartu_keluarga` varchar(255) DEFAULT NULL,
  `foto_anak` varchar(255) DEFAULT NULL,
  `foto_keluarga` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `pendaftaran`
--

INSERT INTO `pendaftaran` (`Id`, `bidang_studi`, `nama_peserta`, `nik`, `nip`, `nuptk`, `no_ukg`, `npwp`, `gelar_depan`, `gelar_belakang`, `tempat_lahir`, `tanggal_lahir`, `no_hp`, `email_utama`, `email_alternatif`, `jenis_kelamin`, `kewarganegaraan`, `no_paspor`, `kode_negara_asal`, `nim`, `prodi_asal`, `jenjang_asal`, `nomor_rekening`, `nama_norek`, `twitter`, `facebook`, `instagram`, `tiktok`, `nama_kontak_darurat`, `no_darurat`, `institusi_asal`, `kode_institusi`, `nama_ibu`, `nama_ayah`, `agama`, `nama_sekolah`, `npsn_sekolah`, `jenjang_sekolah`, `jab_fungsional`, `alamat_rumah`, `provinsi_rumah`, `kota_kab_rumah`, `desa_rumah`, `kode_pos_rumah`, `sekolah_tempat_ppl`, `npsn`, `nama_kepsek`, `nip_kepsek`, `nik_kepsek`, `no_hp_kepsek`, `jabatan_kepsek`, `alamat_sekolah_ppl`, `norek_kepsek`, `npwp_kepsek`, `upload_akte`, `upload_kartu_keluarga`, `foto_anak`, `foto_keluarga`) VALUES
(8, 'Anggit Prayogo', 'Anggit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'tangerang', '2009-01-01', NULL, NULL, NULL, 'L', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '09-12-34WhatsApp Image 2017-10-24 at 18.35.03.jpeg', '09-12-34WhatsApp Image 2017-11-24 at 16.42.39.jpeg', '09-12-43cropped-GGAD-LOGO-2.png', '09-12-43logo.jpeg'),
(9, 'Pendidikan Fisika', 'Ruben', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'test', '2009-01-01', NULL, NULL, NULL, 'L', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '03-12-391. Berhasil signup.PNG', '03-12-392. Gagal signup (data kurang atau sudah terpakai).PNG', '03-12-502. Gagal signup (data kurang atau sudah terpakai).PNG', '03-12-501. Berhasil signup.PNG'),
(10, 'Pendidikan Fisika', 'Rifat', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'test2', '2009-01-01', NULL, NULL, NULL, 'L', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10-12-35filter.png', '10-12-35icon.JPG', '10-12-45edittext.png', '10-12-45cloud-internet-symbol.png'),
(11, 'Pendidikan Fisika', 'Fathan', 'ninini', '2101445505158', 'ibvibi', 'no_ukg', 'buvubuci', 'ncinwicnioo', 'incwincwi', 'Lubuk Pakam', '2003-05-17', '08121336524', 'dwi@gmail.com', 'ccwi wicwi w', 'L', 'indonesia', '-', '123', 'dnwcnwicnwin', 'cmwwowomc', 'mcwicwonown', 'cnonwocnwoncwoev', 'cnwowvnwopm', 'veiienveinqop', 'cnownownvownq', 'mcownovwnownvo', 'novwnovwnvown', 'vnwonvwovwomvwo', 'mwovnwovnwonvwo', 'ovwnvownowvnwon', 'cwocwocmwocmwon', 'nama_ibu', 'nama_ayah', 'agama', 'nama_sekolah', 'npsn_sekolah', 'jenjang_sekolah', 'jab_fungsional', 'vneivnienvi', 'aceh', 'Deli Serdang', 'ecnneiineii', 'wiownwonvwon', 'cwniwiwno', 'wncnwnwo', 'wcncwonwvnw', 'ncwonwovurwn', 'ncwocnwbnru', '081263315054', 'wcnwownvw', 'wcnwownvw', 'cwnoinvnoq', 'wcnonwovwoo', '05-12-071684645647574.jpg', '05-12-07vespa.jpeg', '01-01-28Verifikasi data.drawio (2).png', '01-01-28diagram konteks.png'),
(12, 'Pendidikan Fisika', 'Iqbak', 'indo', '121312424', '134124`', '1311414443', '2329342904i', 'kom', 'Dom', 'Lubuk Pakam', '2009-01-01', '08121336524', 'tih@gmail.com', 'ilu@gmail.com', 'L', 'indonesia', '12133131314', '123', '213132121', 'cmwwowomc', 'prodi', '2111313114131', 'Fatih', '-', '-', '-', '-', 'Rian', '081213141523', 'Universitas Malikussaleh', '062', 'Heryanti', 'Bambang ', 'Islam', 'SDN 106831', '08899283', 'Sekolah Dasar', 'Guru ', 'Blang Pulo', 'NAD', '', 'Blang Pulo', '0552', 'SDN 106831', '2235518', 'Heri', '584616118491', '251819260319', '0815223254', 'PNS', 'PNS', '12233554789', '2557896335', '05-12-37vario.jpg', '05-12-37man-with-beard-avatar-character-isolated-icon-free-vector.jpg', '05-12-52Supra x 125.jpg', '05-12-52vario.jpg'),
(13, 'Pendidikan Fisika', 'Aryo Wibi', '120728154212214', '22365221453', '221455322215', '1223544212', '333778963', '-', 'S.Pd', 'Siantar', '2003-10-11', '081277232611', 'aryo@gmail.com', 'wibi@gmail.com', 'L', 'indonesia', '-', '+62', '210170052', 'Pendidikan Fisika', 'S1', '775412236', 'Aryo WIbi', '-', '-', '-', '-', '081366987455', '081366958741', 'Universitas Negeri Medan ', '4456', 'Amin', 'Elvisma ', 'Islam', 'SMPN 1 Siantar', '2245223', 'Sekolah Menengah Pertama', 'Guru', 'Ldoksin', 'Sumatera Utara', '', 'Desa Jati', '220133', 'SMPN 1Siantar', '1223652', 'Burhanuddin, M.A', '200321145365233', '145223698523', '0815223254', 'Kepala Sekolah', 'Kepala Sekolah', '778966522', '12366563215', '', '', '', ''),
(14, 'Pendidikan Fsika', 'Fatih Dwi ', '1207281712252253', '1211452365', '122021563', '122233652', '112258963212', '-', 'S.Pd', 'Lubuk Pakam', '2003-05-17', '081397715041', 'dwi@gmail.com', 'dwi@gmail.com', 'L', 'Indonesia', '-', 'IDN', '210170057', 'Pendidikan Fisika', 'Universitas Malikussaleh', '71691853', 'Fatih Dwi ', '-', '-', 'fatihdwilaksana', '-', 'Bambang', '081377232678', 'Universitas Malikussaleh', '0082', 'Heryanti', 'Bambang', 'Islam', 'SDN 106831', '122365211', 'Sekolah Dasar', 'Tenaga Pendidik', 'DSN I JLN. BAKARAN BATU', 'Sumatera Utara', '', 'Bakaran Batu', '20512', 'SDN 106831', '1211452365', 'Lumban Sitorus', '122369878455741', '12366985541226', '0812257893', 'PNS', 'PNS', '71691853', '112258963212', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `nis` char(6) NOT NULL DEFAULT '0',
  `kelas` varchar(255) DEFAULT NULL,
  `id_detail_pendaftaran` int(11) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`nis`, `kelas`, `id_detail_pendaftaran`, `nama`) VALUES
('170001', 'B', 7, 'Anggit Prayogo'),
('170002', 'B', 8, 'test'),
('170003', 'B', 8, 'test'),
('170004', 'B', 9, 'test2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_user_2` (`id_user`);

--
-- Indexes for table `cicilan_pendaftaran`
--
ALTER TABLE `cicilan_pendaftaran`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_detail_pendaftaran` (`id_detail_pendaftaran`);

--
-- Indexes for table `detail_pendaftaran`
--
ALTER TABLE `detail_pendaftaran`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `hari`
--
ALTER TABLE `hari`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `id_mapel` (`id_mapel`),
  ADD KEY `id_hari` (`id_hari`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`kode_mapel_kegiatan`);

--
-- Indexes for table `pembayaran_spp`
--
ALTER TABLE `pembayaran_spp`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`nis`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `cicilan_pendaftaran`
--
ALTER TABLE `cicilan_pendaftaran`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `detail_pendaftaran`
--
ALTER TABLE `detail_pendaftaran`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hari`
--
ALTER TABLE `hari`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id_jadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `pembayaran_spp`
--
ALTER TABLE `pembayaran_spp`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `akun`
--
ALTER TABLE `akun`
  ADD CONSTRAINT `akun_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `pendaftaran` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cicilan_pendaftaran`
--
ALTER TABLE `cicilan_pendaftaran`
  ADD CONSTRAINT `cicilan_pendaftaran_ibfk_1` FOREIGN KEY (`id_detail_pendaftaran`) REFERENCES `detail_pendaftaran` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_pendaftaran`
--
ALTER TABLE `detail_pendaftaran`
  ADD CONSTRAINT `detail_pendaftaran_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `pendaftaran` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_pendaftaran_ibfk_2` FOREIGN KEY (`id_admin`) REFERENCES `akun` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `jadwal_ibfk_1` FOREIGN KEY (`id_mapel`) REFERENCES `mapel` (`kode_mapel_kegiatan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_ibfk_2` FOREIGN KEY (`id_hari`) REFERENCES `hari` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Database: `rentalmobil`
--
CREATE DATABASE IF NOT EXISTS `rentalmobil` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `rentalmobil`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `psw` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nama`, `username`, `email`, `psw`) VALUES
(1, 'anisa', 'anisacantik', 'anisaaaftri@gmail.com', 'anisa123'),
(2, 'arum', 'arumcomel', 'arum0312@gmail.com', 'arum123'),
(3, 'carmen', 'carmennita', 'carmennita@gmail.com', 'carmen123'),
(4, 'jamal', 'jamal1', 'jamalludin@gmail.com', 'jamal123'),
(5, 'fatihdwi', 'fatihdwi', 'fatihdwilaksana5@gmail.com', '$2y$10$xYZCSr41lTybyojsgehVA.7TKpTj6pS7vNZyXpNEntb304sbC6ORy');

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `psw` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id`, `nama`, `username`, `email`, `psw`) VALUES
(1, 'rehan', 'rehan1', 'rehanfadlur@gmail.com', 'rehan123'),
(2, 'korin', 'korina', 'korina123@gmail.com', 'korin123');

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(255) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `harga` varchar(255) NOT NULL,
  `transmisi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `foto`, `name`, `harga`, `transmisi`) VALUES
(1, 'vehicle-1.png', 'Avanza', 'Rp.450.000.00', 'MANUAL'),
(3, 'ayla.jpg', 'AYLA', 'Rp.400.000.00', 'MATIC');

-- --------------------------------------------------------

--
-- Table structure for table `rentcar`
--

CREATE TABLE `rentcar` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pesan` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `telpon` varchar(255) NOT NULL,
  `fotokk` varchar(255) NOT NULL,
  `fotoktp` varchar(255) NOT NULL,
  `fotosim` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rentcar`
--

INSERT INTO `rentcar` (`id`, `name`, `pesan`, `alamat`, `telpon`, `fotokk`, `fotoktp`, `fotosim`, `time`) VALUES
(1, 'rehan', '', 'suwandi', '12345678', 'car-2.png', 'car-3.png', 'car-1.png', '12-11-2022 03:54:59pm'),
(2, 'korin', 'PAJERO', 'kemuning', '98765432', 'car-8.png', 'car-7.png', 'car-5.png', '142-11-2022 07:26:09pm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rentcar`
--
ALTER TABLE `rentcar`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rentcar`
--
ALTER TABLE `rentcar`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Database: `siukm`
--
CREATE DATABASE IF NOT EXISTS `siukm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `siukm`;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('hFIow3vJhrYrBp3pq1gBZ6qwDt06fJOjKj6kbbmg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnlBVDZkTTUzNWtZN29nT1QzTkwzVE5iQ21UWDgzNnVLdUR4R1EzbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1747905624);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `surat`
--
CREATE DATABASE IF NOT EXISTS `surat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `surat`;

-- --------------------------------------------------------

--
-- Table structure for table `instansi`
--

CREATE TABLE `instansi` (
  `nama_instansi` varchar(100) DEFAULT NULL,
  `alamat_instansi` varchar(500) DEFAULT NULL,
  `nama_pimpinan` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `instansi`
--

INSERT INTO `instansi` (`nama_instansi`, `alamat_instansi`, `nama_pimpinan`, `email`, `website`, `logo`) VALUES
('PT. CEMERLANG INDAH', 'JL. Jenderal Sudirman, No 20 A Blok G, No .Telp 0819-9082-1273 ', 'Contoh', 'contoh@gmail.com', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `group_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `nip` varchar(20) NOT NULL,
  `nama_pegawai` varchar(100) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `passwd` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`group_id`, `id`, `nip`, `nama_pegawai`, `jabatan`, `email`, `passwd`) VALUES
(3, 5, '2014', 'Demo User', 'Demo User', 'demo@users', '2b0704d1818ede87cd2e67d1e4c4b1d0'),
(1, 4, '20140605', 'Administrator', 'Administrator', 'admi@brainlabs', 'ac292850786776fe2842278e9b544c58');

-- --------------------------------------------------------

--
-- Table structure for table `ref_disposisi`
--

CREATE TABLE `ref_disposisi` (
  `disposisi_id` int(11) NOT NULL,
  `disposisi` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ref_disposisi`
--

INSERT INTO `ref_disposisi` (`disposisi_id`, `disposisi`) VALUES
(1, 'Pimpinan'),
(2, 'Administrator'),
(3, 'Pengelola Surat');

-- --------------------------------------------------------

--
-- Table structure for table `ref_disposisi_detail`
--

CREATE TABLE `ref_disposisi_detail` (
  `detail_id` int(11) NOT NULL,
  `disposisi_id` int(11) DEFAULT NULL,
  `deskripsi` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ref_disposisi_detail`
--

INSERT INTO `ref_disposisi_detail` (`detail_id`, `disposisi_id`, `deskripsi`) VALUES
(1, 1, 'Tindak Lanjut (TL)'),
(2, 1, 'Koordinasikan Dengan yg terkait'),
(3, 1, 'Untuk diketahui'),
(4, 1, 'File'),
(5, 2, 'Datakan'),
(6, 2, 'Koordinasi dengan Bidang Lain/ SKPD Terkait'),
(7, 2, 'Cek, sesuaikan'),
(8, 2, 'Proses'),
(9, 2, 'Buatkan Surat Edaran'),
(10, 2, 'Buatkan Undangan'),
(11, 3, 'Di cek, Input, Sesuaikan'),
(12, 3, 'Diteliti kelengkapan berkasnya, proses'),
(13, 3, 'Transfer ke bidang ,,,,'),
(14, 3, 'Buatkan Konsep Surat Edaran'),
(15, 3, 'Atur Jadwal, Proses'),
(16, 3, 'Tolong dibuatkan Undangan untuk YBS');

-- --------------------------------------------------------

--
-- Table structure for table `ref_perihal`
--

CREATE TABLE `ref_perihal` (
  `perihal_id` int(11) NOT NULL,
  `perihal` varchar(255) DEFAULT NULL COMMENT 'Perihal',
  `diterbitkan_kepada` varchar(255) DEFAULT NULL COMMENT 'di terbitkan kepada',
  `pengelola_surat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ref_perihal`
--

INSERT INTO `ref_perihal` (`perihal_id`, `perihal`, `diterbitkan_kepada`, `pengelola_surat`) VALUES
(1, 'Usul Kenaikan Pangkat', 'KABID MUTASI', 'KASUBID P&k'),
(2, 'Usul Peninjauan Masa Kerja', 'KABID MUTASI', 'KASUBID P&k'),
(3, 'Usul KGB Pimpinan', 'KABID MUTASI', 'KASUBID P&k'),
(4, 'Usul Ralat SK Kenaikan Pangkat', 'KABID MUTASI', 'KASUBID P&k'),
(5, 'Usul KP PI', 'KABID MUTASI', 'KASUBID P&k'),
(6, 'Usul Pengangkatan CPNS ke PNS', 'KABID MUTASI', 'KASUBID P&k'),
(7, 'Usul KP Struktural', 'KABID MUTASI', 'KASUBID P&k'),
(8, 'Usul KP Fungsional', 'KABID MUTASI', 'KASUBID P&k'),
(9, 'Ususl Pensiun BUP', 'KABID MUTASI', 'KASUBID PPP'),
(10, 'Ususl Pensiun  APS', 'KABID MUTASI', 'KASUBID PPP'),
(11, 'Ususl Pensiun  MD', 'KABID MUTASI', 'KASUBID PPP'),
(12, 'Ralat SK Pensiun', 'KABID MUTASI', 'KASUBID PPP'),
(13, 'Usul Mutasi Masuk', 'KABID MUTASI', 'KASUBID PPP'),
(14, 'Usul Mutasi Keluar', 'KABID MUTASI', 'KASUBID PPP'),
(15, 'Usul Ujian PI', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(16, 'Usul Ujian Dinas', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(17, 'Usul Diklat Prajab', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(18, 'Usul Diklat Pimpinan', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(19, 'Usul Diklat Fungsional', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(20, 'Usul Diklat Teknis', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(21, 'Penawaran Diklat', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(22, 'Usul Kenaikan Jabatan Fungsional', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(23, 'Usul Jabatan Fungsional Pertama', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(24, 'Usul Formasi PNS', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(25, 'Usul  Tambahan Pegawai', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(26, 'Usul Ralat SK Jabatan Fungsional', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(27, 'Usul Ralat SK CPNS', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(28, 'Usul Karis/Karsu', 'KABID UMUM', 'KASUBID Pembinaan'),
(29, 'Usul Karpeg', 'KABID UMUM', 'KASUBID Pembinaan'),
(30, 'Usul Taspen', 'KABID UMUM', 'KASUBID Pembinaan'),
(31, 'Usul Satya Lencana Karya Satya', 'KABID UMUM', 'KASUBID Pembinaan'),
(32, 'Usul ID Card', 'KABID UMUM', 'KASUBID Pembinaan'),
(33, 'Permohonan Ijin Perceraian', 'KABID UMUM', 'KASUBID Pembinaan'),
(34, ' Laporan Perkawinan Pertama', 'KABID UMUM', 'KASUBID Pembinaan'),
(35, 'Ijin Cuti Haji', 'KABID UMUM', 'KASUBID Pembinaan'),
(36, 'Ijin Cuti Umroh', 'KABID UMUM', 'KASUBID Pembinaan'),
(37, 'Ijin Cuti Sakit', 'KABID UMUM', 'KASUBID Pembinaan'),
(38, 'Laporan Mekanisme Peremajaan data', 'KABID UMUM', 'KASUBID Layanan'),
(39, 'Usul Perubahan Gaji', 'KABID UMUM', 'KASUBID Layanan'),
(40, 'Usul Ralat KPE', 'KABID UMUM', 'KASUBID Layanan'),
(41, 'Usul Ralat Konversi NIP', 'KABID UMUM', 'KASUBID Layanan'),
(42, 'Laporan Kematian', 'KABID UMUM', 'KASUBID Layanan'),
(43, 'Permintaan data SIPD', 'KABID UMUM', 'KASUBID Layanan'),
(44, 'Permintaan data Portal Pegawaii', 'KABID UMUM', 'KASUBID Layanan'),
(45, 'File Pegawai', 'KABID UMUM', 'KASUBID Layanan'),
(46, 'Penyusunan LAKIP', 'Sekertaris', 'Perencanaan'),
(47, 'Penyusunan RenSTra', 'Sekertaris', 'Perencanaan'),
(48, 'Penyusunan LKPD', 'Sekertaris', 'Perencanaan'),
(49, 'Penyusunan Rka', 'Sekertaris', 'Keuangan'),
(50, 'Penyusunan DPA', 'Sekertaris', 'Keuangan'),
(51, 'Penyusunan Laporan Keuangan', 'Sekertaris', 'Keuangan'),
(52, 'Usul Kenaikan Pangkat', 'KABID MUTASI', 'KASUBID P&k'),
(53, 'Usul Peninjauan Masa Kerja', 'KABID MUTASI', 'KASUBID P&k'),
(54, 'Usul KGB Pimpinan', 'KABID MUTASI', 'KASUBID P&k'),
(55, 'Usul Ralat SK Kenaikan Pangkat', 'KABID MUTASI', 'KASUBID P&k'),
(56, 'Usul KP PI', 'KABID MUTASI', 'KASUBID P&k'),
(57, 'Usul Pengangkatan CPNS ke PNS', 'KABID MUTASI', 'KASUBID P&k'),
(58, 'Usul KP Struktural', 'KABID MUTASI', 'KASUBID P&k'),
(59, 'Usul KP Fungsional', 'KABID MUTASI', 'KASUBID P&k'),
(60, 'Ususl Pensiun BUP', 'KABID MUTASI', 'KASUBID PPP'),
(61, 'Ususl Pensiun  APS', 'KABID MUTASI', 'KASUBID PPP'),
(62, 'Ususl Pensiun  MD', 'KABID MUTASI', 'KASUBID PPP'),
(63, 'Ralat SK Pensiun', 'KABID MUTASI', 'KASUBID PPP'),
(64, 'Usul Mutasi Masuk', 'KABID MUTASI', 'KASUBID PPP'),
(65, 'Usul Mutasi Keluar', 'KABID MUTASI', 'KASUBID PPP'),
(66, 'Usul Ujian PI', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(67, 'Usul Ujian Dinas', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(68, 'Usul Diklat Prajab', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(69, 'Usul Diklat Pimpinan', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(70, 'Usul Diklat Fungsional', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(71, 'Usul Diklat Teknis', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(72, 'Penawaran Diklat', 'KABID PENGEMBANGAN', 'KASUBID Diklat'),
(73, 'Usul Kenaikan Jabatan Fungsional', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(74, 'Usul Jabatan Fungsional Pertama', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(75, 'Usul Formasi PNS', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(76, 'Usul  Tambahan Pegawai', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(77, 'Usul Ralat SK Jabatan Fungsional', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(78, 'Usul Ralat SK CPNS', 'KABID PENGEMBANGAN', 'KASUBID Pengembangan'),
(79, 'Usul Karis/Karsu', 'KABID UMUM', 'KASUBID Pembinaan'),
(80, 'Usul Karpeg', 'KABID UMUM', 'KASUBID Pembinaan'),
(81, 'Usul Taspen', 'KABID UMUM', 'KASUBID Pembinaan'),
(82, 'Usul Satya Lencana Karya Satya', 'KABID UMUM', 'KASUBID Pembinaan'),
(83, 'Usul ID Card', 'KABID UMUM', 'KASUBID Pembinaan'),
(84, 'Permohonan Ijin Perceraian', 'KABID UMUM', 'KASUBID Pembinaan'),
(85, ' Laporan Perkawinan Pertama', 'KABID UMUM', 'KASUBID Pembinaan'),
(86, 'Ijin Cuti Haji', 'KABID UMUM', 'KASUBID Pembinaan'),
(87, 'Ijin Cuti Umroh', 'KABID UMUM', 'KASUBID Pembinaan'),
(88, 'Ijin Cuti Sakit', 'KABID UMUM', 'KASUBID Pembinaan'),
(89, 'Laporan Mekanisme Peremajaan data', 'KABID UMUM', 'KASUBID Layanan'),
(90, 'Usul Perubahan Gaji', 'KABID UMUM', 'KASUBID Layanan'),
(91, 'Usul Ralat KPE', 'KABID UMUM', 'KASUBID Layanan'),
(92, 'Usul Ralat Konversi NIP', 'KABID UMUM', 'KASUBID Layanan'),
(93, 'Laporan Kematian', 'KABID UMUM', 'KASUBID Layanan'),
(94, 'Permintaan data SIPD', 'KABID UMUM', 'KASUBID Layanan'),
(95, 'Permintaan data Portal Pegawaii', 'KABID UMUM', 'KASUBID Layanan'),
(96, 'File Pegawai', 'KABID UMUM', 'KASUBID Layanan'),
(97, 'Penyusunan LAKIP', 'Sekertaris', 'Perencanaan'),
(98, 'Penyusunan RenSTra', 'Sekertaris', 'Perencanaan'),
(99, 'Penyusunan LKPD', 'Sekertaris', 'Perencanaan'),
(100, 'Penyusunan Rka', 'Sekertaris', 'Keuangan'),
(101, 'Penyusunan DPA', 'Sekertaris', 'Keuangan'),
(102, 'Penyusunan Laporan Keuangan', 'Sekertaris', 'Keuangan');

-- --------------------------------------------------------

--
-- Table structure for table `surat_jenis`
--

CREATE TABLE `surat_jenis` (
  `jenis_id` int(11) NOT NULL,
  `nama_jenis` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `surat_jenis`
--

INSERT INTO `surat_jenis` (`jenis_id`, `nama_jenis`) VALUES
(1, 'Surat Tugas'),
(2, 'Surat Perintah'),
(3, 'Perjalanan Dinas'),
(4, 'Surat Keterangan');

-- --------------------------------------------------------

--
-- Table structure for table `surat_keluar`
--

CREATE TABLE `surat_keluar` (
  `surat_keluar_id` int(11) NOT NULL,
  `jenis_surat_id` int(11) DEFAULT NULL,
  `nomor_surat` varchar(45) DEFAULT NULL,
  `tanggal_surat` date DEFAULT NULL,
  `perihal_id` int(11) DEFAULT NULL,
  `tujuan` varchar(100) DEFAULT NULL,
  `penanda_tangan` varchar(100) DEFAULT NULL,
  `catatan` varchar(500) DEFAULT NULL,
  `file_surat` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `surat_masuk`
--

CREATE TABLE `surat_masuk` (
  `surat_masuk_id` int(11) NOT NULL,
  `skpd_pengirim` varchar(100) DEFAULT NULL,
  `tanggal_surat` date DEFAULT NULL,
  `nomor_surat` varchar(45) DEFAULT NULL,
  `perihal_id` int(11) DEFAULT NULL COMMENT 'ref_perihal_id',
  `nomor_agenda` varchar(45) DEFAULT NULL,
  `tanggal_diterima` date DEFAULT NULL,
  `disposisi_id` int(45) DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `file_surat` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int(11) NOT NULL,
  `group` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`group_id`, `group`) VALUES
(1, 'Administrator'),
(2, 'User'),
(3, 'Demo User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nip_UNIQUE` (`nip`);

--
-- Indexes for table `ref_disposisi`
--
ALTER TABLE `ref_disposisi`
  ADD PRIMARY KEY (`disposisi_id`);

--
-- Indexes for table `ref_disposisi_detail`
--
ALTER TABLE `ref_disposisi_detail`
  ADD PRIMARY KEY (`detail_id`);

--
-- Indexes for table `ref_perihal`
--
ALTER TABLE `ref_perihal`
  ADD PRIMARY KEY (`perihal_id`);

--
-- Indexes for table `surat_jenis`
--
ALTER TABLE `surat_jenis`
  ADD PRIMARY KEY (`jenis_id`);

--
-- Indexes for table `surat_keluar`
--
ALTER TABLE `surat_keluar`
  ADD PRIMARY KEY (`surat_keluar_id`);

--
-- Indexes for table `surat_masuk`
--
ALTER TABLE `surat_masuk`
  ADD PRIMARY KEY (`surat_masuk_id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pegawai`
--
ALTER TABLE `pegawai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ref_disposisi`
--
ALTER TABLE `ref_disposisi`
  MODIFY `disposisi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ref_disposisi_detail`
--
ALTER TABLE `ref_disposisi_detail`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `ref_perihal`
--
ALTER TABLE `ref_perihal`
  MODIFY `perihal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `surat_jenis`
--
ALTER TABLE `surat_jenis`
  MODIFY `jenis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `surat_keluar`
--
ALTER TABLE `surat_keluar`
  MODIFY `surat_keluar_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surat_masuk`
--
ALTER TABLE `surat_masuk`
  MODIFY `surat_masuk_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
