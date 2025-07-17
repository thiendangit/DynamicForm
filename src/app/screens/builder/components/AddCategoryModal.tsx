import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStyles } from 'react-native-unistyles';
import { addCategoryModalStyles } from './AddCategoryModal.styles';

const addCategorySchema = z.object({
  title: z.string().min(1, 'Tab name is required'),
});

type AddCategoryForm = z.infer<typeof addCategorySchema>;

interface AddCategoryModalProps {
  onSubmit: (data: { title: string }) => void;
  onCancel: () => void;
}

export function AddCategoryModal({
  onSubmit = () => undefined,
  onCancel = () => undefined,
}: AddCategoryModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryForm>({
    defaultValues: { title: '' },
    resolver: zodResolver(addCategorySchema),
  });

  const { styles } = useStyles(addCategoryModalStyles);

  const handleAdd = (data: AddCategoryForm) => {
    onSubmit({ ...data });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Add New Category</Text>
      <Text style={styles.label}>Tab Name</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.title ? styles.inputError : undefined,
            ]}
            placeholder="Enter tab name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleSubmit(handleAdd)}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCancel}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
