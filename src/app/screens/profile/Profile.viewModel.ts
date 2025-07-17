import { useCallback, useEffect, useState } from 'react';
import { load, save } from '@utils/storage';
import { ProfileFormValues } from './ProfileForm.schema';
import { showSnack } from '@components/snack-bar';

const PROFILE_KEY = 'profile_data_v1';

export function useProfileViewModel() {
    const [profile, setProfile] = useState<ProfileFormValues>({
        avatar: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        const data = load<ProfileFormValues>(PROFILE_KEY);
        if (data) setProfile(data);
    }, []);

    const handleChange = useCallback((data: ProfileFormValues) => {
        setProfile(data);
    }, []);

    const handleSubmit = useCallback((data: ProfileFormValues) => {
        save(PROFILE_KEY, data);
        setProfile(data);
        showSnack({ msg: 'Profile saved successfully!', type: 'success' });
    }, []);

    return {
        selectors: {
            profile,
        },
        handlers: {
            handleChange,
            handleSubmit,
        },
    };
} 