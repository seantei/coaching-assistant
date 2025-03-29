-- Migration number: 0001 	 2025-03-26
DROP TABLE IF EXISTS drills;
DROP TABLE IF EXISTS age_groups;
DROP TABLE IF EXISTS warm_ups;
DROP TABLE IF EXISTS cool_downs;
DROP TABLE IF EXISTS skill_categories;
DROP TABLE IF EXISTS practice_plans;
DROP TABLE IF EXISTS practice_sections;

-- Age Groups Table
CREATE TABLE IF NOT EXISTS age_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  min_age INTEGER NOT NULL,
  max_age INTEGER NOT NULL,
  water_break_frequency INTEGER NOT NULL,
  warm_up_duration INTEGER NOT NULL,
  cool_down_duration INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Skill Categories Table
CREATE TABLE IF NOT EXISTS skill_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Warm-ups Table
CREATE TABLE IF NOT EXISTS warm_ups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  equipment TEXT,
  image_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Warm-up Age Group Relationships
CREATE TABLE IF NOT EXISTS warm_up_age_groups (
  warm_up_id INTEGER NOT NULL,
  age_group_id INTEGER NOT NULL,
  PRIMARY KEY (warm_up_id, age_group_id),
  FOREIGN KEY (warm_up_id) REFERENCES warm_ups(id) ON DELETE CASCADE,
  FOREIGN KEY (age_group_id) REFERENCES age_groups(id) ON DELETE CASCADE
);

-- Cool-downs Table
CREATE TABLE IF NOT EXISTS cool_downs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  equipment TEXT,
  image_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Cool-down Age Group Relationships
CREATE TABLE IF NOT EXISTS cool_down_age_groups (
  cool_down_id INTEGER NOT NULL,
  age_group_id INTEGER NOT NULL,
  PRIMARY KEY (cool_down_id, age_group_id),
  FOREIGN KEY (cool_down_id) REFERENCES cool_downs(id) ON DELETE CASCADE,
  FOREIGN KEY (age_group_id) REFERENCES age_groups(id) ON DELETE CASCADE
);

-- Drills Table
CREATE TABLE IF NOT EXISTS drills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  objective TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  min_players INTEGER NOT NULL,
  max_players INTEGER,
  equipment TEXT,
  image_url TEXT,
  video_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Drill Skill Category Relationships
CREATE TABLE IF NOT EXISTS drill_skill_categories (
  drill_id INTEGER NOT NULL,
  skill_category_id INTEGER NOT NULL,
  PRIMARY KEY (drill_id, skill_category_id),
  FOREIGN KEY (drill_id) REFERENCES drills(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_category_id) REFERENCES skill_categories(id) ON DELETE CASCADE
);

-- Drill Age Group Relationships
CREATE TABLE IF NOT EXISTS drill_age_groups (
  drill_id INTEGER NOT NULL,
  age_group_id INTEGER NOT NULL,
  PRIMARY KEY (drill_id, age_group_id),
  FOREIGN KEY (drill_id) REFERENCES drills(id) ON DELETE CASCADE,
  FOREIGN KEY (age_group_id) REFERENCES age_groups(id) ON DELETE CASCADE
);

-- Practice Plans Table
CREATE TABLE IF NOT EXISTS practice_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  total_duration INTEGER NOT NULL,
  age_group_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (age_group_id) REFERENCES age_groups(id)
);

-- Practice Plan Skill Focus Relationships
CREATE TABLE IF NOT EXISTS practice_plan_skills (
  practice_plan_id INTEGER NOT NULL,
  skill_category_id INTEGER NOT NULL,
  PRIMARY KEY (practice_plan_id, skill_category_id),
  FOREIGN KEY (practice_plan_id) REFERENCES practice_plans(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_category_id) REFERENCES skill_categories(id) ON DELETE CASCADE
);

-- Practice Sections Table
CREATE TABLE IF NOT EXISTS practice_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  practice_plan_id INTEGER NOT NULL,
  section_type TEXT NOT NULL,
  name TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration INTEGER NOT NULL,
  details_id INTEGER,
  details_type TEXT,
  sequence_order INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (practice_plan_id) REFERENCES practice_plans(id) ON DELETE CASCADE
);

-- Initial Data: Age Groups
INSERT INTO age_groups (name, min_age, max_age, water_break_frequency, warm_up_duration, cool_down_duration) VALUES 
  ('U12', 10, 12, 20, 10, 5),
  ('U14', 13, 14, 25, 12, 5),
  ('U16', 15, 16, 30, 15, 8),
  ('High School', 14, 18, 30, 15, 10),
  ('College', 18, 22, 35, 15, 10);

-- Initial Data: Skill Categories
INSERT INTO skill_categories (name, description) VALUES 
  ('Passing', 'Forearm passing, overhead passing, and ball control skills'),
  ('Serving', 'Underhand, overhand, and jump serving techniques'),
  ('Defense', 'Digging, blocking, and court positioning'),
  ('Setting', 'Overhead setting, jump setting, and hand positioning'),
  ('Attacking', 'Hitting, spiking, and approach techniques'),
  ('Blocking', 'Individual and team blocking strategies');

-- Create Indexes
CREATE INDEX idx_drills_name ON drills(name);
CREATE INDEX idx_age_groups_name ON age_groups(name);
CREATE INDEX idx_skill_categories_name ON skill_categories(name);
CREATE INDEX idx_practice_plans_created_at ON practice_plans(created_at);
