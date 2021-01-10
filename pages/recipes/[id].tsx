import React from "react";
import axios from "axios";
import { Container } from "../../components/Container/Container";
import { Recipe } from "../../components/Recipe/Recipe";
import { Meal } from "../../next-env";

type Props = {
  meals: Meal
}

export default function RecipePage({ meals }: Props) {
    return (
        <Container style="margin-top: 4rem">
            {meals && <Recipe meal={meals} />}
        </Container>
    );
}

export async function getServerSideProps({ params }) {

    return {
      props: {
        meals: await (await axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${params.id}`)).data.meals[0]
      }
    }
}