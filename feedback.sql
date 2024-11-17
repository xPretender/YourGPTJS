CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY,
        feedback_text TEXT NOT NULL
    );

select * from feedback;

delete from feedback where id > 0;
