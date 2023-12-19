interface FoodItem {
  name?: string;
  calory?: number;
}

interface Food {
  foodList?: FoodItem[];
  foodId?: string;
  foodCategory?: string;
  createdAt?: Date;
  lastUpdated?: Date;
}
interface Exercise {
  exerciseName?: string;
  exerciseId?: string;
  exerciseStartDate?: Date;
  exerciseEndDate?: Date;
  exerciseTime?: number;
  repeatDate?: string[];
  createdAt?: Date;
  lastUpdated?: Date;
  scheduledDate?: [
    {
      date: Date;
      isDone: Boolean;
    },
  ];
}
interface User {
  email: string;
  password: string;
  gender?: string;
  userFoodList?: Food[];
  userExerciseList?: Exercise[];
  lastUpdated?: Date;
  todayCalory?: number;
  joinedAt?: Date;
}

export type { User, Exercise, Food, FoodItem };
