function Cart() {
  return <div></div>;
}

export async function loader({ request }) {
  const screening_id = Number(request.url.split("=")[1]);
}

export default Cart;
