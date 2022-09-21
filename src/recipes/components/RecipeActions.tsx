import Nav from "common/components/nav/Nav";
import ProfileButton from "common/components/ProfileButton";

const RecipeActions = () => {
  return (
    <>
      <Nav.Start>Recipe</Nav.Start>
      <Nav.Middle>Hello world</Nav.Middle>
      <Nav.End>
        <ProfileButton />
      </Nav.End>
    </>
  );
};

export default RecipeActions;
