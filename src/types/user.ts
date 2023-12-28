interface Menu {
  name: string;
  calory: number | string;
  _id?: string;
}

interface FoodList {
  foodCategory: string;
  totalCalory: number;
  menu: Menu[];
  _id?: string;
}

interface Food extends Document {
  foodList: FoodList[];
  foodId: string;
  createdAt: Date;
  lastUpdated: Date | null;
  _id?: string;
}

interface ScheduledDate {
  date: Date;
  isDone: Boolean;
  _id?: string;
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
  scheduledDate?: ScheduledDate[];
  _id?: string;
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
  _id?: string;
}

export type { User, Exercise, Food, FoodList, Menu };
