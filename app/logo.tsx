import styles from "./logo.module.scss";
import { Playfair_Display } from "@next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Logo() {
	return (
		<div className={styles.logo}>
			<h3 className={styles.title}>
				<span className={playfair.className}>
					Sophoz
				</span>
			</h3>
		</div>
	)
}
