import { useEffect, useState } from 'react'

import styles from './Loader.module.css'

export default function Loader() {

    const [currentValue, setCurrentValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        setMaxValue(Math.floor(Math.random() * (6204 - 5076 + 1)) + 5076);
    }, []);

    useEffect(() => {
        let id = setInterval(() => {
            const randomIncrement = Math.floor(Math.random() * (50 - 5 + 1)) + 5
            setCurrentValue(prev => prev + randomIncrement)
        }, 200);
        return () => clearInterval(id);
    }, [currentValue]);

    return (
        <div className={styles.loader}>
            <div className={styles.loader__inner}>
                <div>Loading</div>
                <div className={styles.loading__rate}>{`Asset warmup (${currentValue}/${maxValue})`}</div>
            </div>
            <div className={styles.loader__cancel}>
                Cancel
            </div>
        </div>
    )
}