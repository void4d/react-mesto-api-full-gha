function Footer({ isLoggedIn }) {
  return isLoggedIn ? (
    <footer className="footer">
      <p className="footer__copyright">&#169; 2023 Mesto Russia</p>
    </footer>
  ) : (
    ''
  )
}

export default Footer
