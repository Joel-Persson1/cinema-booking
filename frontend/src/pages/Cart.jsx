import { Form, useLoaderData } from "react-router-dom";
import { getScreeningWithMovie } from "../services/MovieApi";
import { formatScreeningDate } from "../helpers/convertToDate";
import { Children, useEffect, useState } from "react";

function Cart() {
  const info = useLoaderData();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [pensioner, setPensioner] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const date = formatScreeningDate(info.date);

  function increment(e, set, value) {
    e.preventDefault();

    set(value + 1);
  }

  function decrement(e, set, value) {
    e.preventDefault();

    if (value <= 0) return;

    set(value - 1);
  }

  function calculatePrice() {
    const sum = [];

    if (adults >= 1) {
      const adultPrice = adults * 150;

      sum.push(adultPrice);
    }

    if (children >= 1) {
      const childrenPrice = children * 80;

      sum.push(childrenPrice);
    }

    if (pensioner >= 1) {
      const pensionerPrice = pensioner * 120;

      sum.push(pensionerPrice);
    }

    const totalPrice = sum.reduce((acc, cur) => acc + cur, 0);

    return totalPrice;
  }

  useEffect(() => {
    const sum = calculatePrice();

    setTotalPrice(sum);
  }, [children, adults, pensioner]);

  return (
    <div>
      <div>
        <p>{info.genre}</p>
        <h3>{info.title}</h3>

        <p>{`${date}, kl ${info.start_time}`}</p>
        <p>{info.theater_name}</p>
      </div>

      <div>
        <img src={info.poster_url} alt="" />
      </div>

      <div>
        {adults >= 1 && <div>Adults {adults}st</div>}

        {children >= 1 && <div>Child {children}st</div>}

        {pensioner >= 1 && <div>Pensioner {pensioner}st</div>}

        <p>Summery: {totalPrice} Kr</p>
      </div>

      <Form method="POST">
        <h3>Select number of tickets</h3>

        <input type="hidden" name="total_price" value={totalPrice} />

        <div>
          <p>Adult</p>

          <div>
            <input type="hidden" name="adults" value={adults} />
            <button onClick={(e) => decrement(e, setAdults, adults)}>-</button>
            <span>{adults}</span>
            <button onClick={(e) => increment(e, setAdults, adults)}>+</button>
          </div>
        </div>

        <div>
          <p>child</p>

          <div>
            <input type="hidden" name="children" value={children} />
            <button onClick={(e) => decrement(e, setChildren, children)}>
              -
            </button>
            <span>{children}</span>
            <button onClick={(e) => increment(e, setChildren, children)}>
              +
            </button>
          </div>
        </div>

        <div>
          <p>Pensioner</p>

          <div>
            <input type="hidden" name="pensioner" value={pensioner} />
            <button onClick={(e) => decrement(e, setPensioner, pensioner)}>
              -
            </button>
            <span>{pensioner}</span>
            <button onClick={(e) => increment(e, setPensioner, pensioner)}>
              +
            </button>
          </div>
        </div>

        <input type="submit" />
      </Form>
    </div>
  );
}

export async function loader({ request }) {
  const screening_id = Number(request.url.split("=")[1]);

  const information = await getScreeningWithMovie(screening_id);

  return information;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log("Submitting");

  console.log(data);
}

export default Cart;
