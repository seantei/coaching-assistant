-- Insert warm-up activities
INSERT INTO warm_ups (name, description, duration, equipment, image_url) VALUES
('Dynamic Stretching', 'Players perform active stretches including arm circles, leg swings, high knees, and lunges. Move continuously for the full duration.', 10, NULL, NULL),
('Jogging and Shuffling', 'Players jog around the court perimeter, then shuffle sideways across the court width. Alternate between forward jogging and lateral shuffling.', 8, NULL, NULL),
('Partner Ball Toss', 'Players pair up and toss volleyball back and forth while performing movement patterns (squats, lunges, etc.) called out by coach.', 12, 'Volleyballs', NULL),
('Circle Passing', 'Players form a circle and pass the ball across to teammates. Focus on proper passing form and communication.', 15, 'Volleyballs', NULL),
('Agility Ladder Drills', 'Players perform various footwork patterns through agility ladders, focusing on quick feet and coordination.', 10, 'Agility ladders', NULL);

-- Insert warm-up age group relationships
INSERT INTO warm_up_age_groups (warm_up_id, age_group_id) VALUES
(1, 1), -- Dynamic Stretching for U12
(1, 2), -- Dynamic Stretching for U14
(1, 3), -- Dynamic Stretching for U16
(1, 4), -- Dynamic Stretching for High School
(1, 5), -- Dynamic Stretching for College
(2, 1), -- Jogging and Shuffling for U12
(2, 2), -- Jogging and Shuffling for U14
(2, 3), -- Jogging and Shuffling for U16
(2, 4), -- Jogging and Shuffling for High School
(2, 5), -- Jogging and Shuffling for College
(3, 1), -- Partner Ball Toss for U12
(3, 2), -- Partner Ball Toss for U14
(3, 3), -- Partner Ball Toss for U16
(4, 2), -- Circle Passing for U14
(4, 3), -- Circle Passing for U16
(4, 4), -- Circle Passing for High School
(4, 5), -- Circle Passing for College
(5, 3), -- Agility Ladder Drills for U16
(5, 4), -- Agility Ladder Drills for High School
(5, 5); -- Agility Ladder Drills for College

-- Insert cool-down activities
INSERT INTO cool_downs (name, description, duration, equipment, image_url) VALUES
('Static Stretching', 'Players perform static stretches holding each position for 20-30 seconds. Focus on major muscle groups used during practice.', 5, NULL, NULL),
('Light Jogging and Stretching', 'Players jog slowly around the court, then perform static stretches as a group.', 8, NULL, NULL),
('Partner Stretching', 'Players pair up and assist each other with stretches, providing gentle resistance when appropriate.', 10, NULL, NULL),
('Team Circle Reflection', 'Team forms a circle for light stretching while discussing practice highlights and areas for improvement.', 7, NULL, NULL),
('Yoga Cool-down', 'Players perform basic yoga poses focusing on breathing and relaxation to reduce heart rate and prevent muscle soreness.', 10, NULL, NULL);

-- Insert cool-down age group relationships
INSERT INTO cool_down_age_groups (cool_down_id, age_group_id) VALUES
(1, 1), -- Static Stretching for U12
(1, 2), -- Static Stretching for U14
(1, 3), -- Static Stretching for U16
(1, 4), -- Static Stretching for High School
(1, 5), -- Static Stretching for College
(2, 1), -- Light Jogging and Stretching for U12
(2, 2), -- Light Jogging and Stretching for U14
(2, 3), -- Light Jogging and Stretching for U16
(3, 3), -- Partner Stretching for U16
(3, 4), -- Partner Stretching for High School
(3, 5), -- Partner Stretching for College
(4, 2), -- Team Circle Reflection for U14
(4, 3), -- Team Circle Reflection for U16
(4, 4), -- Team Circle Reflection for High School
(4, 5), -- Team Circle Reflection for College
(5, 4), -- Yoga Cool-down for High School
(5, 5); -- Yoga Cool-down for College

-- Insert drills
INSERT INTO drills (name, objective, description, duration, difficulty, min_players, max_players, equipment, image_url, video_url) VALUES
-- Passing Drills
('Passing Circle', 'Improve forearm passing accuracy and communication', '1. Players form a circle with one player in the middle\n2. Middle player tosses ball to players on the outside\n3. Outside players pass back to the middle\n4. Rotate positions every 2 minutes', 15, 'Beginner', 5, 12, 'Volleyballs', NULL, NULL),
('Partner Passing', 'Develop consistent passing technique', '1. Players pair up facing each other about 10-15 feet apart\n2. One player tosses to partner who passes back\n3. Focus on platform angle and footwork\n4. 10 good passes then switch roles', 10, 'Beginner', 2, NULL, 'Volleyballs', NULL, NULL),
('Pass-Set-Pass', 'Practice passing to target and movement', '1. Groups of 3 form a triangle\n2. First player passes to second player\n3. Second player sets to third player\n4. Third player passes back to first\n5. Rotate positions after 5 successful completions', 15, 'Intermediate', 3, 12, 'Volleyballs', NULL, NULL),
('Wall Passing', 'Develop passing control and consistency', '1. Player stands 5-10 feet from wall\n2. Pass ball against wall continuously\n3. Focus on creating consistent arc and control\n4. Try to achieve consecutive passes without ball touching ground', 10, 'Beginner', 1, NULL, 'Volleyballs', NULL, NULL),
('Butterfly Passing', 'Practice passing while moving between positions', '1. Form two lines at positions 1 and 5\n2. Coach tosses to player in position 5\n3. Player passes to target at position 2/3\n4. After passing, player runs to end of opposite line\n5. Repeat with player from position 1', 20, 'Intermediate', 6, 12, 'Volleyballs', NULL, NULL),

-- Serving Drills
('Serving Target Practice', 'Develop serving accuracy and consistency', '1. Place targets (hoops, towels) on opposite court\n2. Players serve from baseline aiming at targets\n3. Keep score of successful target hits\n4. Increase difficulty by moving targets or changing serve type', 10, 'Intermediate', 4, 16, 'Volleyballs, targets (hoops, towels)', NULL, NULL),
('Serving Zones', 'Improve serving placement to different court areas', '1. Divide court into zones (1-6)\n2. Coach calls out zone number\n3. Player must serve to called zone\n4. Award points for accurate serves\n5. Increase difficulty by making zones smaller', 15, 'Intermediate', 4, 12, 'Volleyballs, court markers', NULL, NULL),
('Progressive Serving', 'Build serving technique from simple to complex', '1. Start with underhand serves from mid-court\n2. Progress to underhand from baseline\n3. Move to standing float serves\n4. Advance to jump float or jump serves as appropriate\n5. Players advance when completing 3 successful serves at each level', 15, 'Beginner', 4, 16, 'Volleyballs', NULL, NULL),
('Pressure Serving', 'Practice serving under game-like pressure', '1. Divide team into two groups on opposite sides\n2. Each player serves in turn\n3. If serve is successful, player stays in game\n4. If serve fails, player is eliminated\n5. Last team with players remaining wins', 10, 'Intermediate', 6, 16, 'Volleyballs', NULL, NULL),
('Serve and Defend', 'Connect serving with defensive transition', '1. Player serves from baseline\n2. After serving, player must quickly move to assigned defensive position\n3. Coach tosses ball to player who must make a defensive play\n4. Rotate positions after each serve', 15, 'Advanced', 6, 12, 'Volleyballs', NULL, NULL),

-- Defense Drills
('Defensive Shuffle', 'Improve defensive positioning and reaction time', '1. Players start in defensive position\n2. Coach signals direction (left, right, forward, back)\n3. Players shuffle in that direction while maintaining stance\n4. Coach tosses ball and player must make the dig\n5. Focus on quick reactions and proper platform', 12, 'Intermediate', 6, 12, 'Volleyballs', NULL, NULL),
('Down Ball Defense', 'Practice digging attacked balls', '1. Coach or player hits controlled attacks (down balls) to defenders\n2. Defenders must dig ball to target area\n3. Focus on platform angle and absorbing ball impact\n4. Rotate positions after 5 attempts', 15, 'Intermediate', 4, 12, 'Volleyballs', NULL, NULL),
('Defensive Coverage', 'Develop team defensive positioning', '1. Position players in defensive formation\n2. Coach hits or tosses balls to different areas\n3. Players must communicate and cover their areas\n4. Focus on proper defensive stance and movement\n5. Rotate positions every 3 minutes', 20, 'Intermediate', 6, 12, 'Volleyballs', NULL, NULL),
('Tip and Roll Drill', 'Practice defending tips and roll shots', '1. Attackers at net alternate between tips and roll shots\n2. Defenders must read and react to the type of attack\n3. Successful digs must go to target area\n4. Rotate positions after 8 attempts', 15, 'Advanced', 8, 12, 'Volleyballs', NULL, NULL),
('Three-Line Defense', 'Improve defensive court coverage and communication', '1. Divide defenders into three lines (left back, middle back, right back)\n2. Coach hits balls to different areas of the court\n3. Appropriate defender must make the play\n4. Other defenders provide coverage\n5. Rotate positions after each defensive attempt', 15, 'Advanced', 6, 12, 'Volleyballs', NULL, NULL),

-- Setting Drills
('Setting Accuracy', 'Develop consistent and accurate setting', '1. Players pair up with one volleyball\n2. One player tosses to the setter\n3. Setter sets to a target or specific location\n4. Switch roles after 10 repetitions\n5. Increase difficulty by adding movement or changing distances', 15, 'Intermediate', 4, 16, 'Volleyballs, targets (optional)', NULL, NULL),
('Triangle Setting', 'Practice setting to different positions', '1. Three players form a triangle\n2. Ball is tossed to setter\n3. Setter must set to called position\n4. Rotate positions after 5 sets\n5. Focus on consistent height and location', 12, 'Intermediate', 3, 12, 'Volleyballs', NULL, NULL),
('Setting Footwork', 'Improve setter movement and positioning', '1. Setter starts in base position\n2. Coach tosses ball to different locations\n3. Setter must move quickly to ball and set to target\n4. Focus on proper footwork and body position\n5. Increase difficulty by tossing further from base position', 10, 'Intermediate', 2, 8, 'Volleyballs, targets', NULL, NULL),
('Back Setting', 'Develop back setting technique', '1. Setter faces one direction\n2. Coach tosses ball from behind setter\n3. Setter must back set to target\n4. Focus on hand position and body alignment\n5. Progress to moving back sets', 15, 'Advanced', 2, 8, 'Volleyballs, targets', NULL, NULL),
('Setter-Hitter Connection', 'Build timing between setter and hitters', '1. Setter in position 2/3\n2. Hitters in positions 4 and 2\n3. Coach tosses to setter\n4. Setter sets to called position\n5. Hitter attacks\n6. Focus on consistent set height and location', 20, 'Advanced', 4, 12, 'Volleyballs, net', NULL, NULL),

-- Attacking Drills
('Hitting Line', 'Practice approach and hitting technique', '1. Form a line of hitters at position 4\n2. Coach or setter at position 2\n3. Toss or set ball to hitters\n4. Hitters practice approach and hit\n5. Rotate to back of line after each hit\n6. Switch to position 2 after everyone has had multiple attempts', 20, 'Advanced', 6, 12, 'Volleyballs, net', NULL, NULL),
('Hitting Angles', 'Develop ability to hit different angles', '1. Place targets in different areas of opposing court\n2. Setter sets to hitter\n3. Coach calls out target area\n4. Hitter attempts to hit to specified area\n5. Rotate hitters after 5 attempts', 15, 'Advanced', 4, 12, 'Volleyballs, net, targets', NULL, NULL),
('Approach Footwork', 'Improve hitting approach and timing', '1. Players line up outside court\n2. On signal, player performs approach steps without ball\n3. Focus on proper footwork (left-right-left for right-handed players)\n4. Progress to approach with arm swing\n5. Finally add ball and hit', 15, 'Intermediate', 4, 16, 'Volleyballs, net (optional)', NULL, NULL),
('Tip and Roll Practice', 'Develop offensive variety with tips and roll shots', '1. Setter sets to hitter\n2. Coach calls "hit," "tip," or "roll"\n3. Hitter executes called shot\n4. Focus on disguising intentions and proper technique\n5. Rotate hitters after 6 attempts', 15, 'Intermediate', 4, 12, 'Volleyballs, net', NULL, NULL),
('Transition Hitting', 'Practice transitioning from defense to offense', '1. Player starts in defensive position\n2. Coach tosses ball for player to dig\n3. After dig, player transitions to hitting position\n4. Setter sets to player who attacks\n5. Focus on quick transition and proper approach', 20, 'Advanced', 6, 12, 'Volleyballs, net', NULL, NULL),

-- Blocking Drills
('Shadow Blocking', 'Develop proper blocking technique and timing', '1. Players line up at net positions\n2. Coach stands opposite side with ball\n3. Coach moves ball side to side above net\n4. Blockers shadow ball movement with proper hand position\n5. Focus on penetrating hands over net', 10, 'Intermediate', 3, 6, 'Volleyballs, net', NULL, NULL),
('Block and Move', 'Improve lateral movement for blockers', '1. Blocker starts at position 3 (middle)\n2. Coach calls "left" or "right"\n3. Blocker shuffles to called position and performs block\n4. Return to middle after each block\n5. Focus on quick footwork and proper hand position', 12, 'Intermediate', 3, 9, 'Net', NULL, NULL),
('Read Blocking', 'Practice reading hitter and setter for blocking', '1. Setter and hitters on one side\n2. Blockers on opposite side\n3. Setter sets to different hitters\n4. Blockers must read and react to set location\n5. Focus on timing and proper positioning', 15, 'Advanced', 6, 12, 'Volleyballs, net', NULL, NULL),
('Block-Dig Combo', 'Connect blocking with floor defense', '1. Blockers at net with defenders behind\n2. Coach or players attack from opposite side\n3. Blockers attempt to block\n4. If ball gets through, defenders must dig\n5. Rotate positions after 5 attempts', 20, 'Advanced', 6, 12, 'Volleyballs, net', NULL, NULL),
('Triple Block Movement', 'Develop coordinated team blocking', '1. Three blockers at net\n2. Coach calls out attack position\n3. Blockers must quickly form proper triple block\n4. Focus on communication and closing the block\n5. Progress to blocking against actual hitters', 15, 'Advanced', 6, 12, 'Volleyballs, net', NULL, NULL);

-- Insert drill skill category relationships
-- Passing drills
INSERT INTO drill_skill_categories (drill_id, skill_category_id) VALUES
(1, 1), -- Passing Circle - Passing
(2, 1), -- Partner Passing - Passing
(3, 1), -- Pass-Set-Pass - Passing
(3, 4), -- Pass-Set-Pass - Setting
(4, 1), -- Wall Passing - Passing
(5, 1); -- Butterfly Passing - Passing

-- Serving drills
INSERT INTO drill_skill_categories (drill_id, skill_category_id) VALUES
(6, 2), -- Serving Target Practice - Serving
(7, 2), -- Serving Zones - Serving
(8, 2), -- Progressive Serving - Serving
(9, 2), -- Pressure Serving - Serving
(10, 2), -- Serve and Defend - Serving
(10, 3); -- Serve and Defend - Defense

-- Defense drills
INSERT INTO drill_skill_categories (drill_id, skill_category_id) VALUES
(11, 3), -- Defensive Shuffle - Defense
(12, 3), -- Down Ball Defense - Defense
(13, 3), -- Defensive Coverage - Defense
(14, 3), -- Tip and Roll Drill - Defense
(15, 3); -- Three-Line Defense - Defense

-- Setting drills
INSERT INTO drill_skill_categories (drill_id, skill_category_id) VALUES
(16, 4), -- Setting Accuracy - Setting
(17, 4), -- Triangle Setting - Setting
(18, 4), -- Setting Footwork - Setting
(19, 4), -- Back Setting - Setting
(20, 4), -- Setter-Hitter Connection - Setting
(20, 5); -- Setter-Hitter Connection - Attacking

-- Attacking drills
INSERT INTO drill_skill_categories (drill_id, skill_category_id) VALUES
(21, 5), -- Hitting Line - Attacking
(22, 5), -- Hitting Angles - Attacking
(23, 5), -- Approach Footwork - Attacking
(24, 5), -- Tip and Roll Practice - Attacking
(25, 5), -- Transition Hitting - Attacking
(25, 3); -- Transition Hitting - Defense

-- Blocking drills
INSERT INTO drill_skill_categories (drill_id, skill_category_id) VALUES
(26, 6), -- Shadow Blocking - Blocking
(27, 6), -- Block and Move - Blocking
(28, 6), -- Read Blocking - Blocking
(29, 6), -- Block-Dig Combo - Blocking
(29, 3), -- Block-Dig Combo - Defense
(30, 6); -- Triple Block Movement - Blocking

-- Insert drill age group relationships
-- U12 appropriate drills
INSERT INTO drill_age_groups (drill_id, age_group_id) VALUES
(1, 1), -- Passing Circle
(2, 1), -- Partner Passing
(4, 1), -- Wall Passing
(8, 1); -- Progressive Serving

-- U14 appropriate drills
INSERT INTO drill_age_groups (drill_id, age_group_id) VALUES
(1, 2), -- Passing Circle
(2, 2), -- Partner Passing
(3, 2), -- Pass-Set-Pass
(4, 2), -- Wall Passing
(5, 2), -- Butterfly Passing
(6, 2), -- Serving Target Practice
(7, 2), -- Serving Zones
(8, 2), -- Progressive Serving
(9, 2), -- Pressure Serving
(11, 2), -- Defensive Shuffle
(12, 2), -- Down Ball Defense
(16, 2), -- Setting Accuracy
(17, 2), -- Triangle Setting
(18, 2), -- Setting Footwork
(23, 2); -- Approach Footwork

-- U16 appropriate drills
INSERT INTO drill_age_groups (drill_id, age_group_id) VALUES
(1, 3), -- Passing Circle
(2, 3), -- Partner Passing
(3, 3), -- Pass-Set-Pass
(4, 3), -- Wall Passing
(5, 3), -- Butterfly Passing
(6, 3), -- Serving Target Practice
(7, 3), -- Serving Zones
(8, 3), -- Progressive Serving
(9, 3), -- Pressure Serving
(10, 3), -- Serve and Defend
(11, 3), -- Defensive Shuffle
(12, 3), -- Down Ball Defense
(13, 3), -- Defensive Coverage
(14, 3), -- Tip and Roll Drill
(15, 3), -- Three-Line Defense
(16, 3), -- Setting Accuracy
(17, 3), -- Triangle Setting
(18, 3), -- Setting Footwork
(19, 3), -- Back Setting
(20, 3), -- Setter-Hitter Connection
(21, 3), -- Hitting Line
(22, 3), -- Hitting Angles
(23, 3), -- Approach Footwork
(24, 3), -- Tip and Roll Practice
(25, 3), -- Transition Hitting
(26, 3), -- Shadow Blocking
(27, 3), -- Block and Move
(28, 3); -- Read Blocking

-- High School appropriate drills
INSERT INTO drill_age_groups (drill_id, age_group_id) VALUES
(3, 4), -- Pass-Set-Pass
(5, 4), -- Butterfly Passing
(6, 4), -- Serving Target Practice
(7, 4), -- Serving Zones
(9, 4), -- Pressure Serving
(10, 4), -- Serve and Defend
(11, 4), -- Defensive Shuffle
(12, 4), -- Down Ball Defense
(13, 4), -- Defensive Coverage
(14, 4), -- Tip and Roll Drill
(15, 4), -- Three-Line Defense
(16, 4), -- Setting Accuracy
(17, 4), -- Triangle Setting
(18, 4), -- Setting Footwork
(19, 4), -- Back Setting
(20, 4), -- Setter-Hitter Connection
(21, 4), -- Hitting Line
(22, 4), -- Hitting Angles
(23, 4), -- Approach Footwork
(24, 4), -- Tip and Roll Practice
(25, 4), -- Transition Hitting
(26, 4), -- Shadow Blocking
(27, 4), -- Block and Move
(28, 4), -- Read Blocking
(29, 4), -- Block-Dig Combo
(30, 4); -- Triple Block Movement

-- College appropriate drills
INSERT INTO drill_age_groups (drill_id, age_group_id) VALUES
(5, 5), -- Butterfly Passing
(6, 5), -- Serving Target Practice
(7, 5), -- Serving Zones
(9, 5), -- Pressure Serving
(10, 5), -- Serve and Defend
(11, 5), -- Defensive Shuffle
(12, 5), -- Down Ball Defense
(13, 5), -- Defensive Coverage
(14, 5), -- Tip and Roll Drill
(15, 5), -- Three-Line Defense
(16, 5), -- Setting Accuracy
(17, 5), -- Triangle Setting
(18, 5), -- Setting Footwork
(19, 5), -- Back Setting
(20, 5), -- Setter-Hitter Connection
(21, 5), -- Hitting Line
(22, 5), -- Hitting Angles
(23, 5), -- Approach Footwork
(24, 5), -- Tip and Roll Practice
(25, 5), -- Transition Hitting
(26, 5), -- Shadow Blocking
(27, 5), -- Block and Move
(28, 5), -- Read Blocking
(29, 5), -- Block-Dig Combo
(30, 5); -- Triple Block Movement
