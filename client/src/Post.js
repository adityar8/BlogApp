export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://images.pexels.com/photos/1089302/pexels-photo-1089302.jpeg?auto=compress&cs=tinysrgb&w=400&h=150&dpr=2"
          alt=""
        ></img>
      </div>

      <div className="content">
        <h2>Temple from AngKor</h2>
        <p className="info">
          <a className="author">Aditya R</a>
          <time>2022-04-01 15:45</time>
        </p>
        <p className="summary">
          The Ta Prohm Temple (and its famous Angkor Wat tree) is one of the
          most photogenic temples in Cambodia. It's known as the “Tomb Raider
          temple”. Chances are you've seen pictures of this place before
        </p>
      </div>
    </div>
  );
}
