const notes = {
  notes: [
    {
      title: "To do list",
      content:
        "Today i have to do this\n\n\n[ ] - first\n[ ] - second\n[ ] - third",
      category: "Work",
    },
    {
      title: "Second",
      content:
        "hello how are you\n\n[ ] - ahdfoasdfa\n[ ] - asdfjalksdjflkadf\n[ ] - asdfasdf",
      category: "fad",
    },
  ],
};

const content = notes.notes[0].content;
const lines = content.split("\n");

const data = lines.map((line, index) => {
  if (line.startsWith("[ ] - ")) {
    if (line.match("[ ] - ")) {
      console.log(line);
    }
    else{
        console.log("no")
    }
  }
});

console.log(data);
