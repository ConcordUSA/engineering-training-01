var copy = require("recursive-copy");

copy("config", "lib/config", function (error, results) {
  if (error) {
    console.error("Copy failed: " + error);
  } else {
    console.info("Copied " + results.length + " files");
  }
});
copy("config", "../../config", function (error, results) {
  if (error) {
    console.error("Copy failed: " + error);
  } else {
    console.info("Copied " + results.length + " files");
  }
});
