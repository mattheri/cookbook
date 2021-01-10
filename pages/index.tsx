import React from "react";
import axios from "axios";
import { Container } from "../components/Container/Container";
import { AppContext } from "../components/Context/AppContext";
import { Favorites } from "../components/Favorites/Favorites";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";
import styles from "../styles/index.module.css";
import { Meal } from "../next-env";
import { GetStaticProps } from "next";
import { fauna, client } from "../utils/db/Fauna";

type Props = {
  meals: Meal[]
}
export default function Home({ meals }: Props) {
  const [ appState ] = React.useContext(AppContext);
  return (
    <main className={styles.main}>
      <Container style="gap: 2rem">
        <h1 className={styles.h1}>You can search for the perfect recipe ☝</h1>
        {appState.connected && 
          <>        
            <Favorites meals={meals} />
            <h1 className={styles.h1}>...or you can choose from your old favorites ☝</h1>
          </>
        }
        <h1 className={styles.h1}>...or try your luck with one of these random recipe 👇</h1>
        {meals.map((meal, index) => index < 9 && <RecipeCard key={index} meal={meal} />)}
      </Container>
    </main>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const {
    Get,
    Create,
    Collection,
    Documents,
    Paginate,
    Lambda,
    Map
  } = fauna.query;

  const daily_meals = await client.query(
    Map(
      Paginate(Documents(Collection("daily_meals"))),
      Lambda(index => Get(index))
    )
  )

  if (!(daily_meals as any).data.length) {
    const { meals } = await (await axios.get("https://www.themealdb.com/api/json/v2/9973533/randomselection.php")).data;

    await client.query(
      Create(
        Collection("daily_meals"),
        {
          data: {
            meals
          }
        }
      )
    );

    return {
      props: {
        meals
      },
      revalidate: 86400
    }
  }

  return {
    props: {
      meals: (daily_meals as any).data[0].data.meals
    },
    revalidate: 86400
  }

}