interface Menu {
  name: string;
  calory: number;
}

interface FoodList {
  foodCategory: string;
  totalCalory: string;
  menu: Menu[];
}

interface Food extends Document {
  foodList: FoodList[];
  foodId: string;
  createdAt: Date;
  lastUpdated: Date | null;
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

export type { User, Exercise, Food, FoodList, Menu };
