const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'marion',
    password: 'qwerty',
    database: 'db'  

});

// Function to execute SQL queries
const executeQuery = (query, values) => {
    return new Promise((resolve, reject)  => {
        pool.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);  

            }
        });
    });
};

// Create the table
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS article (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        body LONGTEXT NOT NULL,
        published DATETIME NOT NULL,
        author_id INT DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY (slug),
        KEY (author_id)
    );
`;

// Insert the data
const insertDataQuery = `
    INSERT INTO article (id, name, slug, image, body, published, author_id) VALUES
        (1, 'Introduction to Ashtanga', 'introduction-to-ashtanga', 'ashtanga.jpg', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna leo, vulputate eget porttitor quis, maximus id lectus. Donec pulvinar est quis sagittis tincidunt. Curabitur sed enim ligula. Mauris lacinia scelerisque magna, dapibus pretium orci commodo vitae. Quisque in diam dui. Aenean nibh nisl, tristique sed sem non, convallis elementum sem.</p>\r\n\r\n<p>Vestibulum aliquam libero libero, non facilisis eros rhoncus et. Duis viverra et sem at mollis. Morbi gravida aliquam libero, at feugiat nulla rutrum ac. Aliquam iaculis diam sit amet nisl auctor tempus. Nunc posuere libero nec lacus posuere, non commodo est molestie. Suspendisse et aliquam ligula. Donec porta suscipit egestas. Curabitur et turpis consequat, finibus lacus id, posuere quam.</p>\r\n\r\n<p>Aliquam erat volutpat. Nunc vulputate tellus augue, a condimentum arcu semper in. Ut scelerisque urna nec massa venenatis, eu dapibus nibh ultricies. Donec aliquam, nibh ac lobortis porttitor, urna purus porttitor ante, sed pharetra ligula nibh sit amet tortor. Integer nec semper felis, et feugiat leo. Morbi ornare maximus dignissim. Donec eu urna vel mi dapibus fermentum et ut dolor. Aenean non ipsum nec risus gravida scelerisque non in nibh. Donec placerat mauris at ante ultrices eleifend.</p>\r\n\r\n<p>Curabitur odio odio, tincidunt a ultrices nec, dignissim quis diam. Nulla at nunc et nibh sodales ultrices vitae vitae purus. Ut blandit suscipit magna at commodo. Suspendisse egestas eros nisl, condimentum lobortis elit blandit quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac tempor nibh, at consectetur erat. Aliquam tincidunt quam eu sapien molestie, at sollicitudin ex consequat. Morbi laoreet diam quis nibh condimentum auctor. Ut in nibh sem. Etiam euismod nibh ac nulla bibendum condimentum. Suspendisse potenti.</p>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id aliquet orci. Fusce posuere non nisl a maximus. Ut vehicula arcu mauris. In tincidunt, metus ut faucibus efficitur, leo odio condimentum diam, ac consectetur nisl arcu a odio. Pellentesque bibendum ut mi ac sodales. Nulla rhoncus ullamcorper enim. Vivamus in arcu ac ligula laoreet mollis. Maecenas maximus pharetra nisl, id convallis mi. Fusce sodales lorem a eros tristique, aliquet dignissim velit consequat.</p>\r\n\r\n<p>Mauris fringilla placerat orci, non congue tortor viverra id. Vivamus rhoncus elit eu purus tincidunt molestie. Nulla ut accumsan risus. Ut fermentum eu orci eget semper. Praesent ac dolor elementum, tempor felis a, gravida nisl.</p>\r\n\r\n<p>Suspendisse congue mi sit amet turpis placerat fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta libero orci, sed facilisis libero lobortis vel. Donec vel metus lacus. Duis venenatis interdum dui, vitae maximus erat laoreet id. Sed ac consectetur urna. Donec at nisl aliquam, euismod diam nec, blandit felis.</p>', '2020-01-08 15:02:30', 3),
(2, 'Morning vinyasa flow routine', 'morning-vinyasa-flow-routine', 'morning.jpg', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna leo, vulputate eget porttitor quis, maximus id lectus. Donec pulvinar est quis sagittis tincidunt. Curabitur sed enim ligula. Mauris lacinia scelerisque magna, dapibus pretium orci commodo vitae. Quisque in diam dui. Aenean nibh nisl, tristique sed sem non, convallis elementum sem.</p>\r\n\r\n<p>Vestibulum aliquam libero libero, non facilisis eros rhoncus et. Duis viverra et sem at mollis. Morbi gravida aliquam libero, at feugiat nulla rutrum ac. Aliquam iaculis diam sit amet nisl auctor tempus. Nunc posuere libero nec lacus posuere, non commodo est molestie. Suspendisse et aliquam ligula. Donec porta suscipit egestas. Curabitur et turpis consequat, finibus lacus id, posuere quam.</p>\r\n\r\n<p>Aliquam erat volutpat. Nunc vulputate tellus augue, a condimentum arcu semper in. Ut scelerisque urna nec massa venenatis, eu dapibus nibh ultricies. Donec aliquam, nibh ac lobortis porttitor, urna purus porttitor ante, sed pharetra ligula nibh sit amet tortor. Integer nec semper felis, et feugiat leo. Morbi ornare maximus dignissim. Donec eu urna vel mi dapibus fermentum et ut dolor. Aenean non ipsum nec risus gravida scelerisque non in nibh. Donec placerat mauris at ante ultrices eleifend.</p>\r\n\r\n<p>Curabitur odio odio, tincidunt a ultrices nec, dignissim quis diam. Nulla at nunc et nibh sodales ultrices vitae vitae purus. Ut blandit suscipit magna at commodo. Suspendisse egestas eros nisl, condimentum lobortis elit blandit quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac tempor nibh, at consectetur erat. Aliquam tincidunt quam eu sapien molestie, at sollicitudin ex consequat. Morbi laoreet diam quis nibh condimentum auctor. Ut in nibh sem. Etiam euismod nibh ac nulla bibendum condimentum. Suspendisse potenti.</p>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id aliquet orci. Fusce posuere non nisl a maximus. Ut vehicula arcu mauris. In tincidunt, metus ut faucibus efficitur, leo odio condimentum diam, ac consectetur nisl arcu a odio. Pellentesque bibendum ut mi ac sodales. Nulla rhoncus ullamcorper enim. Vivamus in arcu ac ligula laoreet mollis. Maecenas maximus pharetra nisl, id convallis mi. Fusce sodales lorem a eros tristique, aliquet dignissim velit consequat.</p>\r\n\r\n<p>Mauris fringilla placerat orci, non congue tortor viverra id. Vivamus rhoncus elit eu purus tincidunt molestie. Nulla ut accumsan risus. Ut fermentum eu orci eget semper. Praesent ac dolor elementum, tempor felis a, gravida nisl.</p>\r\n\r\n<p>Suspendisse congue mi sit amet turpis placerat fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta libero orci, sed facilisis libero lobortis vel. Donec vel metus lacus. Duis venenatis interdum dui, vitae maximus erat laoreet id. Sed ac consectetur urna. Donec at nisl aliquam, euismod diam nec, blandit felis.</p>', '2020-04-14 15:02:41', 2),
(3, 'Secrets of a yoga teacher', 'secrets-of-a-yoga-teacher', 'yoga-teacher.jpg', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna leo, vulputate eget porttitor quis, maximus id lectus. Donec pulvinar est quis sagittis tincidunt. Curabitur sed enim ligula. Mauris lacinia scelerisque magna, dapibus pretium orci commodo vitae. Quisque in diam dui. Aenean nibh nisl, tristique sed sem non, convallis elementum sem.</p>\r\n\r\n<p>Vestibulum aliquam libero libero, non facilisis eros rhoncus et. Duis viverra et sem at mollis. Morbi gravida aliquam libero, at feugiat nulla rutrum ac. Aliquam iaculis diam sit amet nisl auctor tempus. Nunc posuere libero nec lacus posuere, non commodo est molestie. Suspendisse et aliquam ligula. Donec porta suscipit egestas. Curabitur et turpis consequat, finibus lacus id, posuere quam.</p>\r\n\r\n<p>Aliquam erat volutpat. Nunc vulputate tellus augue, a condimentum arcu semper in. Ut scelerisque urna nec massa venenatis, eu dapibus nibh ultricies. Donec aliquam, nibh ac lobortis porttitor, urna purus porttitor ante, sed pharetra ligula nibh sit amet tortor. Integer nec semper felis, et feugiat leo. Morbi ornare maximus dignissim. Donec eu urna vel mi dapibus fermentum et ut dolor. Aenean non ipsum nec risus gravida scelerisque non in nibh. Donec placerat mauris at ante ultrices eleifend.</p>\r\n\r\n<p>Curabitur odio odio, tincidunt a ultrices nec, dignissim quis diam. Nulla at nunc et nibh sodales ultrices vitae vitae purus. Ut blandit suscipit magna at commodo. Suspendisse egestas eros nisl, condimentum lobortis elit blandit quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac tempor nibh, at consectetur erat. Aliquam tincidunt quam eu sapien molestie, at sollicitudin ex consequat. Morbi laoreet diam quis nibh condimentum auctor. Ut in nibh sem. Etiam euismod nibh ac nulla bibendum condimentum. Suspendisse potenti.</p>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id aliquet orci. Fusce posuere non nisl a maximus. Ut vehicula arcu mauris. In tincidunt, metus ut faucibus efficitur, leo odio condimentum diam, ac consectetur nisl arcu a odio. Pellentesque bibendum ut mi ac sodales. Nulla rhoncus ullamcorper enim. Vivamus in arcu ac ligula laoreet mollis. Maecenas maximus pharetra nisl, id convallis mi. Fusce sodales lorem a eros tristique, aliquet dignissim velit consequat.</p>\r\n\r\n<p>Mauris fringilla placerat orci, non congue tortor viverra id. Vivamus rhoncus elit eu purus tincidunt molestie. Nulla ut accumsan risus. Ut fermentum eu orci eget semper. Praesent ac dolor elementum, tempor felis a, gravida nisl.</p>\r\n\r\n<p>Suspendisse congue mi sit amet turpis placerat fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta libero orci, sed facilisis libero lobortis vel. Donec vel metus lacus. Duis venenatis interdum dui, vitae maximus erat laoreet id. Sed ac consectetur urna. Donec at nisl aliquam, euismod diam nec, blandit felis.</p>', '2060-05-28 15:02:55', 3)
`;

executeQuery(createTableQuery)
    .then(() => executeQuery(insertDataQuery))
    .then(() => {
        console.log('Data inserted successfully!');
        pool.end();
    })
    .catch(err => {
        console.error('Error:', err);
    });