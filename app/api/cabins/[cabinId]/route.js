import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;
  try {
    const [cabins, bookedDate] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabins, bookedDate });
  } catch (err) {
    return Response.json("cabin not found");
  }
}
