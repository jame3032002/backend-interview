db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.users.insertMany([
  {
    _id: ObjectId("65cfa17ad00dcd13b311fc47"),
    email: "user1@robinhood.co.th",
    name: "โรบินฮู้ด",
    password: "$2a$10$wy5SGa7veYSFhBrG1mTYe.F6KOgR.RqsapFbvCGPA/jC9wvusjB3C", // Password1!
    createdAt: ISODate("2023-01-01T00:00:00.000+07:00"),
    updatedAt: ISODate("2023-01-01T00:00:00.000+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65cfa186d00dcd13b311fc4a"),
    email: "user2@robinhood.co.th",
    name: "แบทแมน",
    password: "$2a$10$HTYEdFF2HkIHnxMAUPURdO9h6w2meZpkDSRcWGwc3GzBeeW0lc562", // Password1!
    createdAt: ISODate("2023-01-01T00:00:00.000+07:00"),
    updatedAt: ISODate("2023-01-01T00:00:00.000+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65cfa19ad00dcd13b311fc4d"),
    email: "user3@robinhood.co.th",
    name: "แคทวูแมน",
    password: "$2a$10$O7RkerLJ38Y7XtwhMXb6Ie9eGp8Cj7XiEyLWdc/xiBqiJgz/89CmG", // Password1!
    createdAt: ISODate("2023-01-01T00:00:00.000+07:00"),
    updatedAt: ISODate("2023-01-01T00:00:00.000+07:00"),
    __v: 0,
  },
]);

db.interviews.insertMany([
  {
    _id: ObjectId("65d061949166d015d47dee80"),
    title: "นัดสัมภาษณ์งาน 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa17ad00dcd13b311fc47"),
    isArchive: false,
    edited: [
      {
        title: "นัดสัมภาษณ์งาน 1-1",
        description:
          "1-1-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        status: "To Do",
        createdAt: ISODate("2023-01-01T10:10:00.696+07:00"),
        _id: ObjectId("65d067709e8c3fb440e39d2c"),
      },
      {
        title: "นัดสัมภาษณ์งาน 1-2",
        description:
          "1-2-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        status: "Done",
        createdAt: ISODate("2023-01-01T10:12:00.696+07:00"),
        _id: ObjectId("65d0677a9e8c3fb440e39d30"),
      },
      {
        title: "นัดสัมภาษณ์งาน 1-3",
        description:
          "1-3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        status: "Done",
        createdAt: ISODate("2023-01-01T10:20:00.696+07:00"),
        _id: ObjectId("65d0677f9e8c3fb440e39d35"),
      },
    ],
    createdAt: ISODate("2023-01-01T10:00:00.696+07:00"),
    updatedAt: ISODate("2023-01-01T11:00:00.696+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d061979166d015d47dee82"),
    title: "นัดสัมภาษณ์งาน 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa17ad00dcd13b311fc47"),
    isArchive: false,
    edited: [],
    createdAt: ISODate("2023-01-01T15:00:00.816+07:00"),
    updatedAt: ISODate("2023-01-01T15:00:00.816+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d0619b9166d015d47dee84"),
    title: "นัดสัมภาษณ์งาน 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa17ad00dcd13b311fc47"),
    isArchive: false,
    edited: [],
    createdAt: ISODate("2023-01-02T10:00:00.553+07:00"),
    updatedAt: ISODate("2023-01-02T10:00:00.553+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d064b99166d015d47dee93"),
    title: "นัดสัมภาษณ์งาน 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa19ad00dcd13b311fc4d"),
    isArchive: false,
    edited: [],
    createdAt: ISODate("2023-01-03T14:48:09.519+07:00"),
    updatedAt: ISODate("2023-01-03T14:48:09.519+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d064bc9166d015d47dee95"),
    title: "นัดสัมภาษณ์งาน 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa19ad00dcd13b311fc4d"),
    isArchive: false,
    edited: [],
    createdAt: ISODate("2023-02-17T20:00:12.789+07:00"),
    updatedAt: ISODate("2023-02-17T20:00:12.789+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d064d59166d015d47dee98"),
    title: "นัดสัมภาษณ์งาน 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa186d00dcd13b311fc4a"),
    isArchive: false,
    edited: [],
    createdAt: ISODate("2023-05-17T07:48:37.551+07:00"),
    updatedAt: ISODate("2023-05-17T07:48:37.551+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d064d99166d015d47dee9a"),
    title: "นัดสัมภาษณ์งาน 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa186d00dcd13b311fc4a"),
    isArchive: false,
    edited: [],
    createdAt: ISODate("2023-06-17T14:48:41.779+07:00"),
    updatedAt: ISODate("2023-06-17T14:48:41.779+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d064dc9166d015d47dee9c"),
    title: "นัดสัมภาษณ์งาน 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    status: "To Do",
    createdBy: ObjectId("65cfa186d00dcd13b311fc4a"),
    isArchive: false,
    edited: [],
    createdAt: ISODate("2024-07-17T14:48:44.799+07:00"),
    updatedAt: ISODate("2024-07-17T14:48:44.799+07:00"),
    __v: 0,
  },
]);

db.comments.insertMany([
  {
    _id: ObjectId("65d062469166d015d47dee88"),
    interviewId: ObjectId("65d061949166d015d47dee80"),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdBy: ObjectId("65cfa186d00dcd13b311fc4a"),
    createdAt: ISODate("2024-02-17T14:37:42.492+07:00"),
    updatedAt: ISODate("2024-02-17T14:37:42.492+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d062a19166d015d47dee8c"),
    interviewId: ObjectId("65d061949166d015d47dee80"),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdBy: ObjectId("65cfa19ad00dcd13b311fc4d"),
    createdAt: ISODate("2024-02-17T14:39:13.363+07:00"),
    updatedAt: ISODate("2024-02-17T14:39:13.363+07:00"),
    __v: 0,
  },
  {
    _id: ObjectId("65d062a99166d015d47dee8f"),
    interviewId: ObjectId("65d061949166d015d47dee80"),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdBy: ObjectId("65cfa186d00dcd13b311fc4a"),
    createdAt: ISODate("2024-02-17T14:39:21.161+07:00"),
    updatedAt: ISODate("2024-02-17T14:39:21.161+07:00"),
    __v: 0,
  },
]);
