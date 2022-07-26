export default {
  name: "postedBy",
  title: "Posted By",
  type: "reference",
  to: [{ type: "user" }], //reference to user's activity
};
