export async function dependencyDynamicRoutes() {
  const lexical = 40;
  return {
    eval: eval("lexical + 2"),
    function: Function("return 42")()
  };
}
