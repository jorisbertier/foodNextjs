'use client'

import { useEffect, useState } from "react"
import { IFood } from "../../interface"
import { useParams, useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Food = () => {
  const params = useParams(); 
  const { name } = params; 
  const [food, setFood] = useState<IFood | null>(null);

  const router = useRouter()

  const fetchFoods = async () => {
    try {
      const url = `/api/food/${name}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('Failed to fetch the food item');
      }

      const data = await res.json();
      setFood(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (name) {
      fetchFoods();
    }
  }, []);

  if (!food) {
    return <div>Loading...</div>;
  }

  const handleReturn = () => {
    router.back()
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <div onClick={() => handleReturn()}>Retour en arriere</div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{food.name}</CardTitle>
          {/* <CardDescription>{food.description}</CardDescription> */}
        </CardHeader>
        <CardContent>
          <h1 className="text-black text-lg font-bold">Proteins</h1>
          <p>{food.protein}</p>
          <h1 className="text-black text-lg font-bold">Carbs</h1>
          <p>{food.carbohydrates}</p>
          <h1 className="text-black text-lg font-bold">Fats</h1>
          <p>{food.fat}</p>
        </CardContent>
        <CardContent>
          {food.vitamins && <h1 className="text-black text-lg font-bold">Vitamins</h1>}
          {food.vitamins?.map(item =>
            <p key={item}>{item}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Food;