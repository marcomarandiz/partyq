SELECT sid FROM room_songs
WHERE id = 'some room id';

SELECT * FROM songs
WHERE sid = 'some song id';

SELECT upvotes FROM room_songs
WHERE id = 'some room id' AND sid = 'some song id';

SELECT skipvotes FROM room_songs
WHERE id = 'some room id' AND sid = 'some song id';

SELECT name FROM rooms 
WHERE id = 'some room id';

INSERT INTO rooms VALUES
	(DEFAULT, 'some creator name', DEFAULT, 'some room name', DEFAULT);

INSERT INTO room_songs VALUES
	('some song id', 'some room id', TRUE, TRUE, 'some upvote count', 'some skipvote count', DEFAULT);

INSERT INTO songs VALUES
	(DEFAULT, 'some source', 'some title',' some artist', 'some duration');
