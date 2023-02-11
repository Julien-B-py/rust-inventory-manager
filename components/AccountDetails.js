import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

import moment from 'moment/moment'
import localization from 'moment/locale/fr'

import styles from './AccountDetails.module.css'

export default function AccountDetails({ profil, stats, handleSubmit }) {

    moment().locale("fr", localization);

    return (
        <div className={styles.account}>
            <div className={styles.profile}>
                <img src={profil.avatarUrl} />
                <div className={styles.profile__details}>
                    <div>
                        <PersonIcon sx={{ fontSize: 20 }} />
                        <span>{profil.name}</span>
                    </div>
                    <div>
                        <FingerprintIcon sx={{ fontSize: 20 }} />
                        <span>{profil.steamId}</span>
                    </div>
                    <div>
                        <AccessTimeFilledIcon sx={{ fontSize: 20 }} />
                        <span>Dernière synchro : {moment(profil.lastUpdatedInventoryOn).fromNow()}</span>
                        <IconButton
                            aria-label="update"
                            onClick={handleSubmit}
                            size="small"
                            style={{ color: "#fc8181" }}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className={styles.stats}>
                <div className={styles.stat__item}>
                    Nombre total de skins : {stats.items}
                </div>
                <div className={styles.stat__item}>
                    Valeur totale : {(stats.marketValue / 100).toFixed(2)}€
                </div>
                <div className={`${styles.stat__changes} ${styles.stat__item}`}>
                    <div>
                        <span>Fluctuations : {Math.abs(stats.marketMovementValue / 100).toFixed(2)}€</span>
                        {stats.marketMovementValue > 0 ? <ArrowDropUpIcon style={{ color: "green" }} /> : <ArrowDropDownIcon style={{ color: "red" }} />}
                    </div>
                    <span> au cours des {moment().diff(moment(stats.marketMovementTime), 'hours')} dernières heures</span>
                </div>
            </div>
        </div>
    )
}