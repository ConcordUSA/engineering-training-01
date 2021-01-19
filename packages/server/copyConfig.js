var copy = require("recursive-copy");

const options = {
  overwrite: true,
};

copy("../../config", "lib/config", options, function (error, results) {
  if (error) {
    console.error("Copy failed: " + error);
  } else {
    console.info("Copied " + results.length + " files");
  }
});
copy("../../config", "config", options, function (error, results) {
  if (error) {
    console.error("Copy failed: " + error);
  } else {
    console.info("Copied " + results.length + " files");
  }
});
